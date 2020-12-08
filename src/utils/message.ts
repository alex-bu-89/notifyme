enum StatusCode {
  OK = 200,
  INTERNAL_SERVER_ERROR = 500,
}

function bodyToString(
  c: number = StatusCode.OK,
  m: string = '',
  d: object = {},
) {
  return {
    statusCode: c,
    body: {
      code: c,
      message: m,
      data: d,
    },
  };
}

export function success(data: object) {
  return bodyToString(StatusCode.OK, 'ok', data);
}

export function error(code: number = StatusCode.OK, message: string) {
  return bodyToString(code, message);
}

export default {
  success,
  error,
};
