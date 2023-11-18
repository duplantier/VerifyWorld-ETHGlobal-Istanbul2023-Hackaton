import React, { memo } from "react";
import ViewSDKClient from "./ViewSDKClient";

const RenderMenu = ({ url, pdf_title, searchQuery, isOwner}) => {

    const [viewSDKClient, ] = React.useState(new ViewSDKClient());

    const executeSearch = () => {
        viewSDKClient.ready().then(() => {
            viewSDKClient.executeSearch(searchQuery)
        })
    }
    

  const loadPDF = () => {
    viewSDKClient.ready().then(() => {
      viewSDKClient.previewFile(
        "pdf-div",
        {
          defaultViewMode: "FIT_WIDTH",
          showAnnotationTools: true,
          showLeftHandPanel: true,
          showPageControls: true,
          showDownloadPDF: isOwner,
          showPrintPDF: isOwner,
          enableSearchAPIs: true,
        },
        url,
        pdf_title
      ).then(() => {
        {searchQuery && executeSearch();}
      })
      
    });
  };
  return (
    <div className="mt-28">
      <div
     style = {{height:"100vh"}}
        id="pdf-div"
        className="full-window-div border border-gray-100 h-screen"
        onDocumentLoad={loadPDF()}
      ></div>
    </div>
  );
};
export default memo(RenderMenu);