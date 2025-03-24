export async function GET() {
    return Response.json({ success: true, data: "Thank you!" }, { status: 200 });
}

export async function POST(request:Request){
    const {} = await request.json();
}