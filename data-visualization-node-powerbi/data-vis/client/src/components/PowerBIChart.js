import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const PowerBIContainer = styled.div`
  position: relative;
  width: 100%;
  height: 350px;
  background: white;
  border-radius: 8px;
  padding: 20px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
`;

const ChartTitle = styled.h3`
  margin: 0 0 15px 0;
  color: #2d3748;
  font-size: 1.1rem;
  font-weight: 600;
`;

const EmbedFrame = styled.iframe`
  width: 100%;
  height: 280px;
  border: none;
  border-radius: 4px;
  background: white;
`;

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #718096;
  font-size: 0.9rem;
`;

const PowerBIChart = ({
  title,
  embedUrl,
  onChartClick,
  selectedIds,
  isLoading = false,
}) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    // Listen for messages from Power BI iframe
    const handleMessage = (event) => {
      try {
        // Handle Power BI selection events
        if (event.data && event.data.type === "selection") {
          onChartClick(event.data.selectedIds);
        }
      } catch (err) {
        console.error("Error processing Power BI message:", err);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [onChartClick]);

  const handleFrameLoad = () => {
    try {
      // Send selected data to Power BI iframe for highlighting
      if (iframeRef.current && selectedIds.length > 0) {
        iframeRef.current.contentWindow.postMessage(
          {
            type: "highlight",
            selectedIds: selectedIds,
          },
          "*",
        );
      }
    } catch (err) {
      console.error("Error communicating with Power BI frame:", err);
    }
  };

  return (
    <PowerBIContainer>
      <ChartTitle>{title}</ChartTitle>
      {isLoading && (
        <LoadingOverlay>Loading Power BI Visualization...</LoadingOverlay>
      )}
      <EmbedFrame
        ref={iframeRef}
        src={embedUrl}
        onLoad={handleFrameLoad}
        title={title}
        sandbox="allow-scripts allow-same-origin allow-forms"
      />
    </PowerBIContainer>
  );
};

export default PowerBIChart;
