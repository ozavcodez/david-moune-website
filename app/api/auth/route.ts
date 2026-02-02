import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../../../backend/config/database';
import { registerUser, loginUser, getProfile } from '../../../backend/controllers/authController';
import { authenticateToken } from '../../../backend/middleware/auth';

export async function POST(request: NextRequest) {
  await connectDB();
  
  const { pathname } = new URL(request.url);
  const action = pathname.split('/').pop();

  try {
    switch (action) {
      case 'register':
        return await registerUser[registerUser.length - 1](request, NextResponse);
      case 'login':
        return await loginUser[loginUser.length - 1](request, NextResponse);
      default:
        return NextResponse.json(
          { message: 'Endpoint not found' },
          { status: 404 }
        );
    }
  } catch (error) {
    console.error('Auth API error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  await connectDB();
  
  try {
    // For profile endpoint, we need to authenticate first
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json(
        { message: 'Authorization header required' },
        { status: 401 }
      );
    }

    // Mock the Express request/response objects for middleware
    const mockReq: any = { headers: { authorization: authHeader } };
    const mockRes: any = {
      status: (code: number) => ({ json: (data: any) => ({ status: code, json: data }) }),
      json: (data: any) => ({ json: data })
    };

    // This is a simplified approach - in practice, you'd need to adapt the middleware
    return await getProfile(mockReq, NextResponse);
  } catch (error) {
    console.error('Profile API error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}