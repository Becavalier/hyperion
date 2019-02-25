const crypto = require('crypto');

hexo.extend.filter.register('before_post_render', data => {
  data.id = crypto.createHash('md5').update(data.title).digest('hex');
  return data;
});
