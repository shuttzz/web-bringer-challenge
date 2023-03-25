export type Track = {
  status: string;

  label: Label;

  parcel_tracking_items: ParcelTrackingItem[];
};

export type Label = {
  tracking_number: string;

  external_tracking_number: string;
};

export type ParcelTrackingItem = {
  city: null | string;

  state: null | string;

  timestamp: Date;

  country: Country;

  tracking_code_vendor?: TrackingCodeVendor;

  tracking_code?: TrackingCode;
};

export type Country = {
  name: string;
};

export type TrackingCode = {
  tracking_code_locales: TrackingCodeLocale[];
};

export type TrackingCodeLocale = {
  description: string;
};

export type TrackingCodeVendor = {
  tracking_code: TrackingCode;
};
