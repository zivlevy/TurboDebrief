export interface MetaRow {
  metadata: {
    user_response: {
      confirmed: boolean;
      suggested_level: number;
    }
    start_ts: number;
    label: string;
    end_ts: number;
    flight_num: string;
  };
  _id: string;
  uuid: string;
  user_id: string;
  url: string;
  uploaded: number;
  __v: number;
}



