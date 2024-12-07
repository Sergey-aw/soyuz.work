import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

export async function POST(request: NextRequest) {
    const res = await request.json();
    const body = res; // assuming body content is what you've parsed from request.json()
    console.log(body);

    try {
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            },
            scopes: [
                'https://www.googleapis.com/auth/drive',
                'https://www.googleapis.com/auth/drive.file',
                'https://www.googleapis.com/auth/spreadsheets',
            ],
        });

        const sheets = google.sheets({ auth, version: 'v4' });

        // Combine features into a single string, separated by commas
        const featuresString = body.features.join(", ");
        const workfromString = body.workfrom.join(", ");

        const response = await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: 'A1:H1', // Adjust the range to accommodate an additional column for features
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [
                    [body.username, body.email,workfromString,  body.work_other || "", body.occupacy, body.city, body.typeofplace,  body.goals, body.other_goal, featuresString, body.comment || "", body.optInNewsletter ? "Subscribed" : "Not Subscribed"], // Include features in the row
                ],
            },
        });

        // Return a success response
        return new NextResponse(JSON.stringify({ data: response.data }), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (e) {
        console.error("Error in Google Sheets API request:", e);
        return new NextResponse(JSON.stringify({ message: e.message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}