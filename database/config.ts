const knexfile = require('../knexfile');
const knex = require('knex')(knexfile['production']);

const onUpdateTrigger = (table: any) => `
    CREATE TRIGGER ${table}_updated_at
    BEFORE UPDATE ON ${table}
    FOR EACH ROW
    EXECUTE PROCEDURE on_update_timestamp();
`;

module.exports.knex = knex;
module.exports.onUpdateTrigger = onUpdateTrigger;
