const { 
  TOVDAccount,
  TOVDToken,
} = require('../db');
const dayjs = require('dayjs');

module.exports = {
  TOVDValidateToken: async (token) => {
    const row = await TOVDToken.findOne({
      where: {
        token,
      },
      include: [TOVDAccount],
    });
    if (row) {
      return {
        result: +dayjs(row.expiry_at) >= +dayjs(),
        username: row['t_tovd_account'].username,
        id: row['t_tovd_account'].id,
      };
    } else {
      return {
        result: false,
      };
    }
  }
}
