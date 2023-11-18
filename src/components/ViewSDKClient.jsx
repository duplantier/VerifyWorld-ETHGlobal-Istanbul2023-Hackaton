class ViewSDKClient {
    constructor() {
      this.readyPromise = new Promise((resolve) => {
        if (window.AdobeDC) {
          resolve();
        } else {
          document.addEventListener("adobe_dc_view_sdk.ready", () => {
            resolve();
          });
        }
      });
      this.adobeDCView = undefined;
    }
    ready() {
      return this.readyPromise;
    }

    previewFile(divId, viewerConfig, url, pdf_title) {
      const config = {
        clientId: "169cc36454dd4620b8b05b715bed3f33", // 169cc36454dd4620b8b05b715bed3f33 for localhost, 80ec3decefc84b6caac3c7db74006c08 for production
        divId: divId,
      };

      this.adobeDCView = new window.AdobeDC.View(config);

      this.previewFilePromise = this.adobeDCView.previewFile(
        {
          content: {
            location: {
              url: url,
            },
          },
          metaData: {
            fileName: pdf_title,
          },
        },
        viewerConfig
      );

      	
      return this.previewFilePromise;
    }

    executeSearch(searchQuery) {
      this.previewFilePromise.then((adobeViewer) => {
        adobeViewer.getAPIs().then(apis => {
                apis.search(searchQuery)
                        .then(searchObject => console.log(searchObject))
                        .catch(error => console.log(error));
        });
      });
    }
    


  }
  export default ViewSDKClient;