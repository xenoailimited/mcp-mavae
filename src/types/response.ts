export type AigcConfig = {
  seed?: string;
  image_url?: string;
  lora?: string;
  height?: number;
  width?: number;
  step?: number;
  ar?: string;
  control_image?: string;
  model?: string;
  cfg?: number; // 7.0
  sampler?: string;
  denoising_strength?: string; // 0.7
  upscaler?: string;
  pass_steps?: string;
  hr_scale?: string;
  enable_hr?: string; // True | False
  n_iter?: string; // 1
  restore_faces?: string; // True | False
  save_meta?: string; // True | False
  control_units?: {
    model?: string;
    module?: string;
    resize_mode?: string;
    pixel_perfect?: boolean;
    weight?: number; // 0.9
    control_mode?: string;
    threshold_a?: number; // 64
    threshold_b?: number; // 64
    guidance_end?: number; // 1.0
    guidance_start?: number; // 0.0
  }[];
};

export type Image = {
  prompt?: string;
  id?: number;
  owner?: string;
  url?: string;
  task_id?: string;
  state?: number;
  negative_prompt?: string;
  collection?: number;
  created_at?: Date;
  aigc_config?: AigcConfig;
};

export type Collection = {
  id?: number;
  name?: string;
  owner?: string;
  description?: string;
  prompt?: string;
  negative_prompt?: string;
  variables?: string[];
  train_server?: string;
  aigc_config?: AigcConfig;
  created_at?: Date;
  public?: boolean;
  active?: boolean;
};

export type GenerateResponse = {
  message: string;
  data: {
    task_id?: string;
    image_id?: number;
  };
};

export type TaskStateResponse = {
  data?: {
    id?: string;
    status?: string;
    date_created?: string;
    upscaled_urls?: string[];
  };
};

export type LorasResponse = {
  data?: {
    name?: string;
    alias?: string;
    path?: string;
    hash?: string;
  }[];
};

export type ModelsResponse = {
  data?: {
    title?: string;
    model_name?: string;
    hash?: string;
    sha256?: string;
    filename?: string;
    config?: any;
  }[];
};

export type ListImagesResponse = {
  message: string;
  data: Image[];
};

export type ImageStateResponse = {
  message: string;
  data: Image;
};

export type CreateCollectionResponse = {
  message: string;
  data: {
    collection_id: number;
  };
};

export type DeleteCollectionResponse = {
  message: string;
  data: boolean;
};

export type ToggleCollectionResponse = DeleteCollectionResponse;

export type ListCollectionsResponse = {
  message: string;
  data: Collection[];
};

export type CollectionStateResponse = {
  message: string;
  data: Collection;
};

export type UsageConfig = {
  collection_limit?: number;
  generate_image_limit?: number;
};

export type Token = {
  id?: number;
  token?: string;
  owner?: string;
  generate_image_count?: number;
  collection_count?: number;
  usage_config?: UsageConfig;
  created_at?: Date;
};

export type TokenResponse = {
  message: string;
  data: Token | null;
};
