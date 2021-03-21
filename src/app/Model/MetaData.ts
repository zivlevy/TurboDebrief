// tslint:disable:variable-name
export class MetaDataQuery {
  limit?: number = 0;
  page?: number = 1;
  user_id?: string; // Return files created by provided use
  from_date?: number; // Return files created after provided timestamp
  to_date?: number; // Return files created before provided timestamp
  start_ts?: number; // Return files with start_ts after provided timestamp
  end_ts?: number; // Return files with end_ts before provided timestamp
  label?: string; // Free text search on label property
  flight_num?: string; // Return metadata for specific flight number
}

export interface UserResponse {
 confirmed: boolean;
 suggested_level: number;
}

export interface MetaDataItem {
  start_ts: number;
  end_ts: number;
  flight_num: string;
  label: string;
  user_response: UserResponse;
}
export interface RawDataItem {
  _id: string;
  uuid: string;
  user_id: string;
  url: string;
  uploaded: number;
  metadata: MetaDataItem;

}

export interface Turbulence {
  airplane: string;
  alt: number;
  altitude: number;
  fNum: string;
  lat: number;
  lng: number;
  sev: number;
  simulated: boolean;
  ts: number;
  x: number;
  y: number;
}

export interface RawData {
  avgG: number;
  g: number;
  location: boolean;
  noise: boolean;
  position: boolean;
  timeStampMiliseconds: number;
}


export interface RawDataItemResponse {
  data: RawDataItem[];
  totalPages: number;
  currentPage: number;
}

export interface RawDataResponse {
  rawData: RawData[];
  turbulences: Turbulence[];
}


