module.exports.index = async (ctx) => {
  ctx.response.body = {
    status: 200,
    data: { foo: 'bar' },
  };
};
