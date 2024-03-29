import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Inserts seed entries
  await knex('tennis_match').insert([
    {
      poster_id: 1,
      ntrp_level: 4.0,
      start_date_time: knex.raw(knex.raw("current_date + interval '10 days'")),
      end_date_time: knex.raw(knex.raw("current_date + interval '10 days'")),
      district: 'NORTH',
      match_type: 'SINGLES',
      court: '北區運動場',
      remarks: 'Hello I am there'
    },
    {
      poster_id: 2,
      ntrp_level: 3.0,
      start_date_time: knex.raw(knex.raw("current_date + interval '10 days'")),
      end_date_time: knex.raw(knex.raw("current_date + interval '10 days'")),
      district: 'TAI_PO',
      match_type: 'SINGLES',
      court: '大埔運動場',
      remarks: 'Beginner friendly!'
    },
    {
      poster_id: 3,
      ntrp_level: 2.5,
      start_date_time: knex.raw(knex.raw("current_date + interval '10 days'")),
      end_date_time: knex.raw(knex.raw("current_date + interval '10 days'")),
      district: 'EASTERN',
      match_type: 'DOUBLES',
      court: '私人網球場',
      remarks: 'Telegram me for more detail'
    },
    {
      poster_id: 3,
      ntrp_level: 2.5,
      start_date_time: knex.raw(knex.raw("current_date + interval '10 days'")),
      end_date_time: knex.raw(knex.raw("current_date + interval '10 days'")),
      district: 'EASTERN',
      match_type: 'DOUBLES',
      court: '私人網球場',
      remarks: 'Telegram me for more detail'
    },
    {
      poster_id: 3,
      ntrp_level: 2.5,
      start_date_time: knex.raw(knex.raw("current_date + interval '10 days'")),
      end_date_time: knex.raw(knex.raw("current_date + interval '10 days'")),
      district: 'EASTERN',
      match_type: 'DOUBLES',
      court: '私人網球場',
      remarks: 'Telegram me for more detail'
    },
    {
      poster_id: 3,
      ntrp_level: 2.5,
      start_date_time: knex.raw(knex.raw("current_date + interval '10 days'")),
      end_date_time: knex.raw(knex.raw("current_date + interval '10 days'")),
      district: 'EASTERN',
      match_type: 'DOUBLES',
      court: '私人網球場',
      remarks: 'Telegram me for more detail'
    },
    {
      poster_id: 3,
      ntrp_level: 2.5,
      start_date_time: knex.raw(knex.raw("current_date + interval '10 days'")),
      end_date_time: knex.raw(knex.raw("current_date + interval '10 days'")),
      district: 'EASTERN',
      match_type: 'DOUBLES',
      court: '私人網球場',
      remarks: 'Telegram me for more detail'
    },
    {
      poster_id: 3,
      ntrp_level: 2.5,
      start_date_time: knex.raw(knex.raw("current_date + interval '10 days'")),
      end_date_time: knex.raw(knex.raw("current_date + interval '10 days'")),
      district: 'EASTERN',
      match_type: 'DOUBLES',
      court: '私人網球場',
      remarks: 'Telegram me for more detail'
    },
    {
      poster_id: 3,
      ntrp_level: 2.5,
      start_date_time: knex.raw(knex.raw("current_date + interval '10 days'")),
      end_date_time: knex.raw(knex.raw("current_date + interval '10 days'")),
      district: 'EASTERN',
      match_type: 'DOUBLES',
      court: '私人網球場',
      remarks: 'Telegram me for more detail'
    },
    {
      poster_id: 3,
      ntrp_level: 2.5,
      start_date_time: knex.raw(knex.raw("current_date + interval '10 days'")),
      end_date_time: knex.raw(knex.raw("current_date + interval '10 days'")),
      district: 'EASTERN',
      match_type: 'DOUBLES',
      court: '私人網球場',
      remarks: 'Telegram me for more detail'
    },
    {
      poster_id: 3,
      ntrp_level: 2.5,
      start_date_time: knex.raw(knex.raw("current_date + interval '10 days'")),
      end_date_time: knex.raw(knex.raw("current_date + interval '10 days'")),
      district: 'EASTERN',
      match_type: 'DOUBLES',
      court: '私人網球場',
      remarks: 'Telegram me for more detail'
    },
    {
      poster_id: 3,
      ntrp_level: 2.5,
      start_date_time: knex.raw(knex.raw("current_date + interval '10 days'")),
      end_date_time: knex.raw(knex.raw("current_date + interval '10 days'")),
      district: 'EASTERN',
      match_type: 'DOUBLES',
      court: '私人網球場',
      remarks: 'Telegram me for more detail'
    },
    {
      poster_id: 3,
      ntrp_level: 2.5,
      start_date_time: knex.raw(knex.raw("current_date + interval '10 days'")),
      end_date_time: knex.raw(knex.raw("current_date + interval '10 days'")),
      district: 'EASTERN',
      match_type: 'DOUBLES',
      court: '私人網球場',
      remarks: 'Telegram me for more detail'
    },
    {
      poster_id: 3,
      ntrp_level: 2.5,
      start_date_time: knex.raw(knex.raw("current_date + interval '10 days'")),
      end_date_time: knex.raw(knex.raw("current_date + interval '10 days'")),
      district: 'EASTERN',
      match_type: 'DOUBLES',
      court: '私人網球場',
      remarks: 'Telegram me for more detail'
    },
    {
      poster_id: 3,
      ntrp_level: 2.5,
      start_date_time: knex.raw(knex.raw("current_date + interval '10 days'")),
      end_date_time: knex.raw(knex.raw("current_date + interval '10 days'")),
      district: 'EASTERN',
      match_type: 'DOUBLES',
      court: '私人網球場',
      remarks: 'Telegram me for more detail'
    },
    {
      poster_id: 3,
      ntrp_level: 2.5,
      start_date_time: knex.raw(knex.raw("current_date + interval '10 days'")),
      end_date_time: knex.raw(knex.raw("current_date + interval '10 days'")),
      district: 'EASTERN',
      match_type: 'DOUBLES',
      court: '私人網球場',
      remarks: 'Telegram me for more detail'
    },
    {
      poster_id: 3,
      ntrp_level: 2.5,
      start_date_time: knex.raw(knex.raw("current_date + interval '10 days'")),
      end_date_time: knex.raw(knex.raw("current_date + interval '10 days'")),
      district: 'EASTERN',
      match_type: 'DOUBLES',
      court: '私人網球場',
      remarks: 'Telegram me for more detail'
    },
    {
      poster_id: 3,
      ntrp_level: 2.5,
      start_date_time: knex.raw(knex.raw("current_date + interval '10 days'")),
      end_date_time: knex.raw(knex.raw("current_date + interval '10 days'")),
      district: 'EASTERN',
      match_type: 'DOUBLES',
      court: '私人網球場',
      remarks: 'Telegram me for more detail'
    },
    {
      poster_id: 3,
      ntrp_level: 2.5,
      start_date_time: knex.raw(knex.raw("current_date + interval '10 days'")),
      end_date_time: knex.raw(knex.raw("current_date + interval '10 days'")),
      district: 'EASTERN',
      match_type: 'DOUBLES',
      court: '私人網球場',
      remarks: 'Telegram me for more detail'
    },
    {
      poster_id: 3,
      ntrp_level: 2.5,
      start_date_time: knex.raw(knex.raw("current_date + interval '10 days'")),
      end_date_time: knex.raw(knex.raw("current_date + interval '10 days'")),
      district: 'EASTERN',
      match_type: 'DOUBLES',
      court: '私人網球場',
      remarks: 'Telegram me for more detail'
    },
    {
      poster_id: 3,
      ntrp_level: 2.5,
      start_date_time: knex.raw(knex.raw("current_date + interval '10 days'")),
      end_date_time: knex.raw(knex.raw("current_date + interval '10 days'")),
      district: 'EASTERN',
      match_type: 'DOUBLES',
      court: '私人網球場',
      remarks: 'Telegram me for more detail'
    },
    {
      poster_id: 3,
      ntrp_level: 2.5,
      start_date_time: knex.raw(knex.raw("current_date + interval '10 days'")),
      end_date_time: knex.raw(knex.raw("current_date + interval '10 days'")),
      district: 'EASTERN',
      match_type: 'DOUBLES',
      court: '私人網球場',
      remarks: 'Telegram me for more detail'
    },
    {
      poster_id: 3,
      ntrp_level: 2.5,
      start_date_time: knex.raw(knex.raw("current_date + interval '10 days'")),
      end_date_time: knex.raw(knex.raw("current_date + interval '10 days'")),
      district: 'EASTERN',
      match_type: 'DOUBLES',
      court: '私人網球場',
      remarks: 'Telegram me for more detail'
    },
    {
      poster_id: 3,
      ntrp_level: 2.5,
      start_date_time: knex.raw(knex.raw("current_date + interval '10 days'")),
      end_date_time: knex.raw(knex.raw("current_date + interval '10 days'")),
      district: 'EASTERN',
      match_type: 'DOUBLES',
      court: '私人網球場',
      remarks: 'Telegram me for more detail'
    },
    {
      poster_id: 3,
      ntrp_level: 2.5,
      start_date_time: knex.raw(knex.raw("current_date + interval '10 days'")),
      end_date_time: knex.raw(knex.raw("current_date + interval '10 days'")),
      district: 'EASTERN',
      match_type: 'DOUBLES',
      court: '私人網球場',
      remarks: 'Telegram me for more detail'
    },
    {
      poster_id: 3,
      ntrp_level: 2.5,
      start_date_time: knex.raw(knex.raw("current_date + interval '10 days'")),
      end_date_time: knex.raw(knex.raw("current_date + interval '10 days'")),
      district: 'EASTERN',
      match_type: 'DOUBLES',
      court: '私人網球場',
      remarks: 'Telegram me for more detail'
    },
    {
      poster_id: 3,
      ntrp_level: 2.5,
      start_date_time: knex.raw(knex.raw("current_date + interval '10 days'")),
      end_date_time: knex.raw(knex.raw("current_date + interval '10 days'")),
      district: 'EASTERN',
      match_type: 'DOUBLES',
      court: '私人網球場',
      remarks: 'Telegram me for more detail'
    },
    {
      poster_id: 3,
      ntrp_level: 2.5,
      start_date_time: knex.raw(knex.raw("current_date + interval '10 days'")),
      end_date_time: knex.raw(knex.raw("current_date + interval '10 days'")),
      district: 'EASTERN',
      match_type: 'DOUBLES',
      court: '私人網球場',
      remarks: 'Telegram me for more detail'
    },
    {
      poster_id: 3,
      ntrp_level: 2.5,
      start_date_time: knex.raw(knex.raw("current_date + interval '10 days'")),
      end_date_time: knex.raw(knex.raw("current_date + interval '10 days'")),
      district: 'EASTERN',
      match_type: 'DOUBLES',
      court: '私人網球場',
      remarks: 'Telegram me for more detail'
    },
    {
      poster_id: 3,
      ntrp_level: 2.5,
      start_date_time: knex.raw(knex.raw("current_date + interval '10 days'")),
      end_date_time: knex.raw(knex.raw("current_date + interval '10 days'")),
      district: 'EASTERN',
      match_type: 'DOUBLES',
      court: '私人網球場',
      remarks: 'Telegram me for more detail'
    },
    {
      poster_id: 3,
      ntrp_level: 2.5,
      start_date_time: knex.raw(knex.raw("current_date + interval '10 days'")),
      end_date_time: knex.raw(knex.raw("current_date + interval '10 days'")),
      district: 'EASTERN',
      match_type: 'DOUBLES',
      court: '私人網球場',
      remarks: 'Telegram me for more detail'
    },
    {
      poster_id: 3,
      ntrp_level: 2.5,
      start_date_time: knex.raw(knex.raw("current_date + interval '10 days'")),
      end_date_time: knex.raw(knex.raw("current_date + interval '10 days'")),
      district: 'EASTERN',
      match_type: 'DOUBLES',
      court: '私人網球場',
      remarks: 'Telegram me for more detail'
    },
    {
      poster_id: 3,
      ntrp_level: 2.5,
      start_date_time: knex.raw(knex.raw("current_date + interval '10 days'")),
      end_date_time: knex.raw(knex.raw("current_date + interval '10 days'")),
      district: 'EASTERN',
      match_type: 'DOUBLES',
      court: '私人網球場',
      remarks: 'Telegram me for more detail'
    },
    {
      poster_id: 3,
      ntrp_level: 2.5,
      start_date_time: knex.raw(knex.raw("current_date + interval '10 days'")),
      end_date_time: knex.raw(knex.raw("current_date + interval '10 days'")),
      district: 'EASTERN',
      match_type: 'DOUBLES',
      court: '私人網球場',
      remarks: 'Telegram me for more detail'
    }
  ]);
}
