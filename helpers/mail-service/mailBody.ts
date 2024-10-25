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
  items: {
    name: string;
    quantity: number;
    price: number;
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
              <div class="invoice-details">
                  <p><strong>Order Number:</strong> ${data?.orderNumber}</p>
                  <p><strong>Order Date:</strong> ${new Date(data?.orderDate).toLocaleDateString()} at ${new Date(data?.orderDate).toLocaleTimeString()} </p>
                  <p><strong>Total Amount:</strong> ${data?.totalAmount}</p>
                  <p><strong>Items Ordered:</strong></p>
                  <ul>
                      ${data?.items?.map((item: { name: string; price: number; quantity: number; }) => `<li>${item?.name|| "N/A"} - $${item?.price|| "N/A"} (Qty: ${item?.quantity|| "N/A"})</li>`).join('')}
                  </ul>
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
