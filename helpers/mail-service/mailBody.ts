export const verificationMailBody = (data: any) => {
    return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Verification</title>
      <style>
          body {
              margin: 0;
              padding: 0;
              font-family: 'Roboto', Arial, sans-serif;
              background-color: #f4f4f4;
              color: #333;
          }
          .container {
              width: 100%;
              background-color: #f4f4f4;
              padding: 20px;
          }
          .content {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              padding: 20px;
              text-align: center;
          }
          .header {
              margin-bottom: 20px;
          }
          .header img {
              width: 150px;
          }
          .code {
              display: inline-block;
              font-size: 24px;
              font-weight: bold;
              letter-spacing: 2px;
              color: #ffffff;
              background-color: #007BFF;
              padding: 15px 25px;
              border-radius: 4px;
          }
          .button {
              display: inline-block;
              font-size: 16px;
              font-weight: bold;
              color: #ffffff;
              background-color: #007BFF;
              padding: 12px 20px;
              border-radius: 4px;
              text-decoration: none;
              margin-top: 20px;
          }
          .footer {
              margin-top: 20px;
              font-size: 12px;
              color: #999;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="content">
              <div class="header">
                  <img src="https://yourdomain.com/logo.png" alt="Onuragi Handicraft">
              </div>
              <h1 style="color: #333; margin-bottom: 10px;">Email Verification</h1>
              <p style="color: #555; font-size: 16px;">Thank you for registering! Please use the code below to verify your email address.</p>
              <div style="margin: 20px 0;">
                  <span class="code">${data?.code}</span>
              </div>
              <div class="footer">
                  <p>&copy; 2024 Onuragi Handicraft. All rights reserved.</p>
                  <p>Bogura, Bangladesh</p>
              </div>
          </div>
      </div>
  </body>
  </html>
  `;
  };

export type OrderConfirmationMailBodyType = {
  orderNumber: string;
  orderDate: string;
  totalAmount: number;
  deliveryAddress?: {
    street: string;
    city: string;
    zipCode: string;
  }
  paymentMethod?: {
    method: string;
    tid: string;
  };
  items: {
    name: string;
    quantity: number;
    price: number;
    color: string;
    size: string;
  }[]
};

export const orderConfirmationMailBody = (data: OrderConfirmationMailBodyType) => {
    return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Confirmation</title>
      <style>
          body {
              margin: 0;
              padding: 0;
              font-family: 'Roboto', Arial, sans-serif;
              background-color: #f4f4f4;
              color: #333;
          }
          .container {
              width: 100%;
              background-color: #f4f4f4;
              padding: 20px;
          }
          .content {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              padding: 20px;
              text-align: center;
          }
          .header {
              margin-bottom: 20px;
          }
          .header img {
              width: 150px;
          }
          .invoice-details {
              margin: 20px 0;
              text-align: left;
          }
          .button {
              display: inline-block;
              font-size: 16px;
              font-weight: bold;
              color: #ffffff;
              background-color: #007BFF;
              padding: 12px 20px;
              border-radius: 4px;
              text-decoration: none;
              margin-top: 20px;
          }
          .footer {
              margin-top: 20px;
              font-size: 12px;
              color: #999;
          }
          .two-column-table {
              width: 100%;
              margin: 20px 0;
              border-collapse: collapse;
          }
          .two-column-table td {
              vertical-align: top;
              padding: 10px;
              border: 1px solid #ddd;
          }
          .two-column-table th {
              text-align: left;
              font-weight: bold;
              background-color: #f2f2f2;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="content">
              <div class="header">
                  <img src="https://yourdomain.com/logo.png" alt="Onuragi Handicraft">
              </div>
              <h1 style="color: #333; margin-bottom: 10px;">Order Confirmation</h1>
              <p style="color: #555; font-size: 16px;">Thank you for your order! Below are the details:</p>
              
              <table style="width: 100%; margin: 20px 0; border-collapse: collapse; line-height: 1.5">
                  <tr>
                      
                      <td>
                          <h4 style="text-align: left; margin-top: 20px; font-style: italic; font-weight: bold">Delivery Address:</h4>
                          <p style="line-height: 1.5; text-align: left"><strong>Street:</strong> ${data?.deliveryAddress?.street || "N/A"}</p>
                          <p style="line-height: 1.5; text-align: left"><strong>City:</strong> ${data?.deliveryAddress?.city || "N/A"}</p>
                          <p style="line-height: 1.5; text-align: left"><strong>Zip Code:</strong> ${data?.deliveryAddress?.zipCode || "N/A"}</p>
                          <h4 style="text-align: left; line-height: 1.5; margin-top: 20px; font-style: italic; font-weight: bold">Payment Method:</h4>
                          <p style="line-height: 1.5; text-align: left"><strong>Method:</strong> ${data?.paymentMethod?.method || "N/A"}</p>
                          <p style="line-height: 1.5; text-align: left"><strong>Transaction ID:</strong> ${data?.paymentMethod?.tid || "N/A"}</p>
                      </td>
                      <td>
                          <h4 style="text-align: left; margin-top: 20px; font-style: italic; font-weight: bold">Order Information:</h4>
                          <p style="text-align: left; line-height: 1.5;"><strong>Order Number:</strong> ${data?.orderNumber}</p>
                          <p style="text-align: left; line-height: 1.5;"><strong>Order Date:</strong> ${new Date(data?.orderDate).toLocaleDateString()} at ${new Date(data?.orderDate).toLocaleTimeString()}</p>
                          <p style="text-align: left; line-height: 1.5;"><strong>Total Amount:</strong> ${data?.totalAmount}</p>
                          <p style="text-align: left; line-height: 1.5;"><strong>Items Ordered:</strong></p>
                      </td>
                  </tr>
              </table>
              
              <div class="invoice-details">
                  <table style="width: 100%;">
                      <thead>
                          <tr style="background-color: #f2f2f2; color: #333; font-weight: bold;">
                              <th>Name</th>
                              <th>Color</th>
                              <th>Size</th>
                              <th>Quantity</th>
                              <th>Price</th>
                          </tr>
                      </thead>
                      <tbody>
                          ${data?.items?.map((item) => `
                              <tr>
                                  <td>${item?.name}</td>
                                  <td>${item?.color}</td>
                                  <td>${item?.size}</td>
                                  <td>${item?.quantity}</td>
                                  <td>${item?.price}</td>
                              </tr>
                          `).join("")}
                      </tbody>
                      <tfoot>
                          <tr>
                              <td colspan="4" style="text-align: right; font-weight: bold;">Total:</td>
                              <td>${data?.totalAmount}</td>
                          </tr>
                      </tfoot>
                  </table>
              </div>
              
              <div class="footer">
                  <p>&copy; 2024 Onuragi Handicraft. All rights reserved.</p>
                  <p>Bogura, Bangladesh</p>
              </div>
          </div>
      </div>
  </body>
  </html>
  `;
};

