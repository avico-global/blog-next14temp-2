const axios = require("axios");
const fs = require("fs");
const path = require("path");

const getImagePath = (project_id) => {
  return project_id
    ? `project_images/${project_id}`
    : `industry_template_images/${process.env.NEXT_PUBLIC_TEMPLATE_ID}`;
};

const cleanDomain = (domain) => {
  if (!domain) return domain;
  return domain
    .replace(/\s+/g, "")
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "");
};

// Get the domain name or return the default if the host matches certain criteria
const getDomain = (host) => {
  const defaultDomain = "custom-wheels-car-rims.com";
  if (
    host &&
    !["localhost", "vercel", "amplifyapp.com", "amplifytest"].some((sub) =>
      host.includes(sub)
    )
  ) {
    return cleanDomain(host);
  }
  return defaultDomain;
};

async function callBackendApi({ domain, type = "" }) {
  let baseURL = `https://api.sitebuilderz.com/api/public/project_data_by_domain/${domain}/data`;
  try {
    const response = await fetch(`${baseURL}/${type}`);
    if (!response.ok) {
      const error = new Error(
        `HTTP Error: ${response.status} - ${response.statusText}`
      );
      error.status = response.status;
      error.statusText = response.statusText;
      error.requestedURL = response.url;
      error.responseBody = await response.text();
      if (
        response.status === 400 &&
        response.statusText === "Bad Request" &&
        error.responseBody.includes("check your parameter")
      ) {
        return {
          error: {
            status: response.status,
            statusText: response.statusText,
            responseBody: error.responseBody,
          },
        };
      }
      throw error;
    }
    const responseData = await response.json();
    return responseData;
  } catch (err) {
    console.error("🚀 ~ callBackendApi ~ error:", err);
    return {
      error: {
        status: err.status,
        statusText: err.statusText,
        responseBody: err.responseBody,
      },
    };
  }
}

function isImage(fileName) {
  if (typeof fileName !== "string") return false;
  return /\.(gif|jpg|jpeg|tiff|png|webp)$/i.test(fileName);
}

function extractImageData({ data }) {
  const result = [];

  data.forEach((item) => {
    const images = [];
    let singleImage = "";
    if (item.file_name && isImage(item.file_name)) {
      singleImage = item.file_name;
    }
    Object.keys(item).forEach((key) => {
      const value = item[key];
      if (Array.isArray(value)) {
        value.forEach((val) => {
          if (isImage(val)) {
            images.push(val);
          }
        });
      }
    });
    if (singleImage || images.length > 0) {
      result.push({
        key: item.key,
        image: singleImage,
        images: images,
      });
    }
  });

  return result;
}

async function downloadImage({ imageName, project_id }) {
  const maxRetries = 3;
  const imagePath = getImagePath(project_id);
  const baseURL = `https://api.sitebuilderz.com/images/${imagePath}`;
  const imageUrl = `${baseURL}/${imageName}`;
  console.log("👊 ~ downloadImage ~ imageUrl:", imageUrl)
  const folderPath = path.join(process.cwd(), "public", "img");
  await fs.promises.mkdir(folderPath, { recursive: true });
  const localImagePath = path.join(folderPath, imageName);

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await axios({
        url: imageUrl,
        method: "GET",
        responseType: "stream",
        timeout: 10000, // 10 seconds
      });

      await new Promise((resolve, reject) => {
        const writer = fs.createWriteStream(localImagePath);
        response.data.pipe(writer);
        writer.on("finish", resolve);
        writer.on("error", reject);
      });
      console.log(`Image downloaded: ${imageName}`);
      break; // Exit loop if successful
    } catch (err) {
      console.error(`Attempt ${attempt} failed for ${imageName}:`, err);
      if (attempt === maxRetries) throw err;
    }
  }
}

async function downloadAllImages({ result, project_id }) {
  console.log("👊 ~ downloadAllImages ~ result:", result)
  console.log("👊 ~ downloadAllImages ~ project_id:", project_id);
  const concurrentDownloads = 5; // Limit to 5 concurrent downloads
  for (let i = 0; i < result.length; i += concurrentDownloads) {
    const chunk = result.slice(i, i + concurrentDownloads);
    await Promise.all(
      chunk.map((item) => {
        const downloadPromises = [];
        if (item.image) {
          downloadPromises.push(
            downloadImage({ imageName: item.image, key: item.key, project_id })
          );
        }
        if (Array.isArray(item.images) && item.images.length > 0) {
          item.images.forEach((imageName) => {
            downloadPromises.push(
              downloadImage({ imageName, key: item.key, project_id })
            );
          });
        }
        return Promise.all(downloadPromises);
      })
    );
  }
  console.log("All images have been downloaded.");
}

async function downloadImages() {
  const domain = getDomain("custom-wheels-car-rims.com");
  const data = await callBackendApi({ domain, type: "" });
  const project_id = data?.project_id || null;

  // if (fs.existsSync("public/img")) {
  //   return; // Return if the directory already exists
  // }
  const imagesUrls = extractImageData(data);
  await downloadAllImages({ result: imagesUrls, project_id });
}

downloadImages();
