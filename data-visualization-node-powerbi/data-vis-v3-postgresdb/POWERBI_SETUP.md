# Power BI Integration Guide

This document explains how to integrate Power BI visualizations into your React dashboard while maintaining the same interactive functionality.

## **Overview**

The application now supports two visualization engines:
1. **React Charts** (Recharts) - Default, lightweight, fully interactive
2. **Power BI** - Professional-grade, advanced analytics, enterprise features

## **Integration Methods**

### **Option 1: Power BI Publish to Web (Public)**
**Best for:** Public data, prototypes, simple integration

**Steps:**
1. Open Power BI Desktop and create your visualizations
2. Publish to Power BI Service
3. Go to File → Embed → Publish to web (public)
4. Copy the embed URL for each visualization
5. Update the configuration in `PowerBIVisualization.js`

**Pros:**
- Easy setup
- No additional cost
- Works immediately

**Cons:**
- Public access only
- Limited interactive features
- No security controls

### **Option 2: Power BI Embedded (Enterprise)**
**Best for:** Production apps, secure data, full features

**Requirements:**
- Azure subscription
- Power BI Pro licenses
- Power BI Embedded capacity

**Steps:**
1. Set up Azure Power BI Embedded capacity
2. Create workspace in Power BI
3. Generate embed tokens
4. Configure authentication
5. Use Power BI JavaScript API

**Pros:**
- Enterprise security
- Full interactive features
- Advanced analytics
- Row-level security

**Cons:**
- Higher cost
- Complex setup
- Requires Azure knowledge

## **Setup Instructions**

### **1. Create Power BI Visualizations**

Create these four charts in Power BI:

**Scatter Plot:**
- X-axis: Quantity
- Y-axis: Sales Amount  
- Size/Color: Customer Rating

**Bar Chart:**
- Axis: Product Name
- Value: Sales Amount

**Line Chart:**
- X-axis: Date Sold
- Y-axis: Sales Amount

**Pie Chart:**
- Category: Product Category
- Value: Sum of Sales Amount

### **2. Get Embed Codes**

#### **For Publish to Web:**
```javascript
// Update these URLs in PowerBIVisualization.js
const powerBIUrls = {
  scatterChart: 'https://app.powerbi.com/view?r=YOUR_SCATTER_EMBED_CODE',
  barChart: 'https://app.powerbi.com/view?r=YOUR_BAR_EMBED_CODE',
  lineChart: 'https://app.powerbi.com/view?r=YOUR_LINE_EMBED_CODE',
  pieChart: 'https://app.powerbi.com/view?r=YOUR_PIE_EMBED_CODE'
};
```

#### **For Power BI Embedded:**
```javascript
// Use PowerBI JavaScript API
import { PowerBiService } from 'powerbi-client';

const powerBiService = new PowerBiService();
// Configuration for embedded charts
```

### **3. Enable Cross-Chart Communication**

To maintain the same functionality (selecting points filtering the table), you need to:

#### **Option A: Custom JavaScript (Recommended)**
Add this script to your Power BI reports:
```javascript
// In Power BI Report Settings → Advanced
window.addEventListener('message', function(event) {
  if (event.data.type === 'highlight') {
    // Highlight selected data points
    powerbi.visuals.highlight(event.data.selectedIds);
  }
});

// When user clicks on visualization
function onSelectionChanged(selectedIds) {
  window.parent.postMessage({
    type: 'selection',
    selectedIds: selectedIds
  }, '*');
}
```

#### **Option B: URL Parameters**
```javascript
// Update embed URLs with selection parameters
const embedUrl = baseEmbedUrl + '&filter=Product/ID eq ' + selectedId;
```

### **4. Install Required Packages**

```bash
# For Power BI Embedded integration
npm install powerbi-client powerbi-report-authoring

# For better communication (optional)
npm install @microsoft/office-js-helpers
```

### **5. Configuration Files**

#### **powerbi-config.js**
```javascript
export const powerBIConfig = {
  embedUrl: 'YOUR_POWERBI_EMBED_URL',
  accessToken: 'YOUR_ACCESS_TOKEN',
  embedType: 'report',
  tokenType: models.TokenType.Embed,
  permissions: models.Permissions.All,
  viewMode: models.ViewMode.View,
  settings: {
    filterPaneEnabled: false,
    navigationPaneEnabled: false
  }
};
```

#### **powerbi-service.js**
```javascript
import { PowerBiService } from 'powerbi-client';
import { powerBIConfig } from './powerbi-config';

export class PowerBIService {
  constructor() {
    this.powerbi = new PowerBiService();
  }

  embedReport(element, config) {
    return this.powerbi.embed(element, {
      ...powerBIConfig,
      ...config
    });
  }

  updateFilters(report, filters) {
    return report.updateFilters(models.FiltersOperations.Replace, filters);
  }
}
```

## **Features Comparison**

| Feature | React Charts | Power BI |
|---------|--------------|----------|
| **Performance** | Fast, lightweight | Slower, but feature-rich |
| **Interactivity** | Full custom control | Limited but professional |
| **Analytics** | Basic | Advanced (DAX, measures) |
| **Styling** | Complete control | Limited customization |
| **Security** | Client-side only | Enterprise grade |
| **Cost** | Free | Requires licenses |
| **Setup** | Simple | Complex |
| **Maintenance** | Low | Medium |

## **Best Practices**

### **For Production Use:**
1. Use Power BI Embedded for security
2. Implement proper authentication
3. Set up automatic data refresh
4. Monitor usage and performance
5. Handle loading states gracefully

### **For Development/Prototyping:**
1. Start with Publish to Web
2. Use mock data initially
3. Test interactivity thoroughly
4. Monitor browser console for errors

### **Performance Optimization:**
1. Lazy load Power BI charts
2. Cache embed tokens
3. Use responsive embedding
4. Minimize chart complexity

## **Troubleshooting**

### **Common Issues:**

**"Embed URL not working"**
- Verify URL is correct
- Check public sharing settings
- Ensure report is published

**"Selection not working"**
- Check JavaScript communication
- Verify postMessage event handling
- Ensure same-origin policy compliance

**"Performance issues"**
- Reduce data complexity
- Optimize Power BI queries
- Use smaller sample datasets

**"Authentication errors"**
- Verify Azure AD setup
- Check token expiration
- Ensure proper permissions

### **Debug Tools:**
```javascript
// Enable Power BI debugging
window.powerbi.debug.enable(true);

// Monitor communication events
window.addEventListener('message', console.log);

// Check Power BI API status
console.log(window.powerbi);
```

## **Next Steps**

1. **Start Simple:** Begin with Publish to Web
2. **Test Thoroughly:** Verify all interactions work
3. **Scale Up:** Move to Power BI Embedded for production
4. **Monitor:** Track usage and performance
5. **Maintain:** Regular updates and optimizations

## **Support Resources**

- [Power BI Documentation](https://docs.microsoft.com/en-us/power-bi/)
- [Power BI Embedded Guide](https://docs.microsoft.com/en-us/power-bi/developer/embedded/)
- [React Integration Samples](https://github.com/microsoft/PowerBI-React)
- [Community Forums](https://community.powerbi.com/)