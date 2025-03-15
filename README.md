# Azure Computer Vision: React + Vite + ASP.NET Core

This project demonstrates how to integrate Azure Cognitive Services Computer Vision with a React (Vite) front end and an ASP.NET Core backend.

## How it Works

- On the front end, users can select an image file, which is immediately previewed in the browser using a blob URL (for efficiency and memory management).  
- The selected image is then uploaded as FormData to the backend endpoint.  
- The backend uses the Azure Cognitive Services Computer Vision SDK to analyze the image and return details such as detected objects and confidence scores.  
- Results are displayed in the React app.

## Features

- Quick file preview without any conversion to base64.  
- Automatic CORS handling using ASP.NET Core’s built-in middleware.  
- Minimal code for uploading and receiving the analysis result.  
- Displays object detection

## Example 

![image](https://github.com/user-attachments/assets/cdd3ff8c-e356-4715-88f1-67bd428014ea)

## Getting Started

1. Clone or download this repository.  
2. Set up your Azure Computer Vision key and endpoint in the backend’s appsettings.json (or user-secrets).  
3. From the backend’s solution folder, run the ASP.NET project.  
4. In the React front end folder, install dependencies:  
   ```
   npm install
   npm run dev
   ```
   (or the equivalent with yarn or pnpm).  
5. Open the front end’s URL in your browser, select an image, and click Upload. You’ll see the analysis results if everything is configured correctly.

## License

This project is licensed under the MIT License. For more details, see the [LICENSE](LICENSE) file.
