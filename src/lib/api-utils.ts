import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function successResponse(data: unknown, status = 200) {
  return NextResponse.json(data, { status });
}

export function errorResponse(error: string, status = 400, details?: unknown) {
  return NextResponse.json(
    { error, ...(details ? { details } : {}) },
    { status }
  );
}

export function handleApiError(err: unknown) {
  if (err instanceof ZodError) {
    return errorResponse("Validation error", 400, err.flatten().fieldErrors);
  }

  if (err instanceof SyntaxError) {
    return errorResponse("Malformed JSON body", 400);
  }

  console.error("Unhandled API error:", err);
  return errorResponse("Internal server error", 500);
}
