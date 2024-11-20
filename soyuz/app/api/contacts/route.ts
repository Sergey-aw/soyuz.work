// unisender API subscribe new

import { NextRequest, NextResponse } from "next/server";
const apiKey = process.env.UNISENDER_API as string;

export async function POST(request: NextRequest) {
  
    
      // Assuming you're receiving email and name from the request body
      const res = await request.json();

      // UniSender API URL
      const apiUrl = 'https://api.unisender.com/ru/api/subscribe?format=json';
      
      // Prepare your parameters
      const params = new URLSearchParams({
        api_key: apiKey, // Replace YOUR_API_KEY with your actual UniSender API key
        list_ids: '852',
        double_optin: '3',
      
  
      });
      params.set('fields[email]', res['email']);


      // Perform the POST request
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: params,

        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      // Await for response from UniSender
      const data = await response.json();
    console.log(response);
    console.log(NextRequest);
      return NextResponse.json(data);
    

  }

