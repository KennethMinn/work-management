export interface MyEvent {
  title: string;
  start: Date;
  end: Date;
}

import { z } from "zod";

export interface Task {
  id: number;
  is_reported: boolean;
  customer_id: number;
  project_id: number;
  title: string;
  description: string;
  user_id: number;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  meeting_link: string;
  location: string;
  status: string;
  is_done: boolean;
  progress: number;
  created_at: string;
  updated_at: string;
  customer: Customer;
  project: Project;
  user: User;
  designData: DesignData | null;
  artworkSizes: [];
  shootingData: ShootingData | null;
  frontEndData: FrontEndData | null;
  backEndData: BackEndData | null;
  uiUxData: UiUxData | null;
  testingData: TestingData | null;
  deployment: Deployment | null;
  photoEditingData: PhotoEditingData | null;
  videoEditingData: VideoEditingData | null;
  contentManagementData: ContentManagementData | null;
}

export interface Customer {
  id: number;
  name: string;
  business_type: string;
  contact_person: string;
  phone: string;
  email: string;
  address: string;
  social_link: string;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: number;
  customer_id: number;
  name: string;
  description: string;
  value: number;
  contract_date: string;
  start_date: string;
  end_date: string;
  document: string;
  user_id: number;
  created_at: string;
  updated_at: string;
  fileURL: string;
}

export interface User {
  id: number;
  name: string;
  company_id: number;
  position_id: number;
  email: string;
  role: string;
  phone: string;
  gender: string;
  nrc_number: string;
  department_id: number;
  photo_path: string;
  email_verified_at: null;
  created_at: string;
  updated_at: string;
  imgURL: string;
}

export interface DesignData {
  id: number;
  brand: string;
  type_of_media: string;
  deadline: string;
  designer_id: number;
  content_writer_id: number;
  visual_copy: string;
  headline: string;
  body: string;
  objective: string;
  important_info: string;
  taste_style: string;
  reference: string;
  reference_photo: string;
  created_at: string;
  updated_at: string;
  artworkSizes: ArtworkSizes;
  imageURL: string;
  pivot: Pivot2;
}

export interface ArtworkSizes {
  id: number;
  visual_format: string;
  aspect_ratio: string;
  width: string;
  height: string;
  resolution: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot;
}

export interface ShootingData {
  id: number;
  shooting_location: string;
  type_detail: string;
  script_detail: string;
  scene_number: string;
  document: string;
  contact_name: string;
  contact_phone: string;
  duration: string;
  type: string;
  client: string;
  date: string;
  video_shooting_project: string;
  photo_shooting_project: string;
  arrive_office_on_time: string;
  transportation_charge: string;
  shooting_description: string;
  food_charge: string;
  other_charge: string;
  total_charge: string;
  out_time: string;
  in_time: string;
  crew_list: string[];
  project_details: string;
  created_at: string;
  updated_at: string;
  fileURL: string;
  pivot: Pivot;
  shooting_accessory_categories: Item[];
  shooting_accessories: Item[];
}

export interface FrontEndData {
  id: number;
  feature_type: string[];
  reference_figma: string;
  detail_task: string;
  design_validation_detail: string;
  styling_detail: string;
  api_integration: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot;
}

export interface BackEndData {
  id: number;
  use_case: string;
  crud_type: string;
  detail: string;
  database_migration: string;
  controller_name: string;
  routes: string;
  related_view: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot;
}

export interface UiUxData {
  id: number;
  customer_requirement: string;
  ui_type: string[];
  reference_platform: string;
  ui_detail_task: string;
  ui_styling_detail: string;
  total_ui_screen: number;
  confirmed_ui_screen: number;
  created_at: string;
  updated_at: string;
  pivot: Pivot;
}

export interface Deployment {
  id: number;
  deployment_type: string;
  deployment_brief: string;
  server_type: string;
  instance_name: string;
  configuration: string;
  db_type: string;
  db_name: string;
  ip_and_port: string;
  username: string;
  project_type: string[];
  dev_type: string[];
  sub_domain: string;
  server_restart_after_deploy: boolean;
  apk_released_if_mobile: boolean;
  deployment_issues: string;
  deployment_overall: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot;
}

export interface TestingData {
  id: number;
  testing_type: string;
  initial_test_brief: string;
  testing_issues: string;
  testing_overall: string;
  customer_comment: string | null;
  created_at: string;
  updated_at: string;
  pivot: Pivot;
}

export interface PhotoEditingData {
  id: number;
  brand_name: string;
  project_title: string;
  project_start_date: string;
  draft_deadline: string;
  final_deadline: string;
  account_executive: string;
  photo_retoucher: string[];
  project_description: string;
  client_request_detail: string;
  number_of_retouch_photos: number;
  color_grade: string;
  editing_style: string;
  remark: string;
  editing_reference: string;
  created_at: string;
  updated_at: string;
  pivot: Pivot;
}

export interface VideoEditingData {
  id: number;
  brand_name: string;
  project_title: string;
  project_start_date: string;
  draft_deadline: string;
  final_deadline: string;
  account_executive: string;
  video_editor: string[];
  project_description: string;
  client_request_detail: string;
  color_grade: string;
  editing_style: string;
  motion_text_effect: string;
  three_d_animation: string;
  high_light: Highlight[];
  pivot: Pivot2;
}

export interface ContentManagementData {
  id: number;
  content_title: string;
  notify_date: string;
  notify_time: string;
  content_description: string;
  is_seen: number;
  is_close: number;
  created_at: string;
  updated_at: string;
  pivot: Pivot;
}

export interface Pivot {
  assigned_task_id: number;
  shooting_id: number;
}

export interface Pivot2 {
  shooting_id: number;
  shooting_accessory_category_id: number;
}

export interface Item {
  id: number;
  accessory_name: string | null;
  required_qty: number;
  taken_qty: number;
  returned_qty: number;
}

export interface Highlight {
  id: number;
  time: string;
  description: string;
  remark: string;
}

export const taskFormSchema = z.object({
  title: z.string().min(1, "title is required"),
  description: z.string().min(1, "description is required"),

  start_date: z.date().min(new Date("2022-01-01"), "date is required"),
  end_date: z.date().min(new Date("2022-01-01"), "date is required"),
  start_time: z.string().min(1, "start time is required"),
  end_time: z.string().min(1, "end time is required"),
  customer_id: z.string().min(1, "customer is required"),
  project_id: z.string().min(1, "project is required"),
  user_id: z.string().min(1, "user is required"),
  meeting_link: z.string().optional(),
  location: z.string().min(1, "location is required"),

  //Graphic Design
  //reference_photo -> from comp
  brand: z.string().optional(),
  type_of_media: z.string().optional(),
  designer_id: z.string().optional(),
  content_writer_id: z.string().optional(),
  visual_copy: z.string().optional(),
  headline: z.string().optional(),
  deadline: z.date().optional(),
  body: z.string().optional(),
  objective: z.string().optional(),
  important_info: z.string().optional(),
  taste_style: z.string().optional(),
  visual_format: z.string().optional(),
  aspect_ratio: z.string().optional(),
  width: z.string().optional(),
  height: z.string().optional(),
  resolution: z.string().optional(),
  reference: z.string().optional(),

  //shooting
  //document file -> from comp
  duration: z.string().optional(),
  shooting_location: z.string().optional(),
  type: z.string().optional(),
  type_detail: z.string().optional(),
  script_detail: z.string().optional(),
  scene_number: z.string().optional(),
  contact_name: z.string().optional(),
  contact_phone: z.string().optional(),
  client: z.string().optional(),
  video_shooting_project: z.string().optional(),
  photo_shooting_project: z.string().optional(),
  arrive_office_on_time: z.string().optional(),
  shooting_description: z.string().optional(),
  food_charge: z.string().optional(),
  other_charge: z.string().optional(),
  total_charge: z.string().optional(),
  transportation_charge: z.string().optional(),
  out_time: z.string().optional(),
  in_time: z.string().optional(),
  crew_list: z.array(z.string()).optional(),
  project_details: z.string().optional(),

  //photo&video editing
  brand_name: z.string().optional(),
  project_title: z.string().optional(),
  project_start_date: z.date().optional(),
  draft_deadline: z.date().optional(),
  final_deadline: z.date().optional(),
  account_executive: z.string().optional(),
  photo_retoucher: z.array(z.string()).optional(),
  video_editor: z.array(z.string()).optional(), //video
  project_description: z.string().optional(),
  client_request_detail: z.string().optional(),
  number_of_retouch_photos: z.number().optional(),
  color_grade: z.string().optional(),
  editing_style: z.string().optional(),
  motion_text_effect: z.string().optional(), //video
  three_d_animation: z.string().optional(), //video
  remark: z.string().optional(),
  editing_reference: z.string().optional(),
  //highlight -> from comp -> video -> [{time : string , description : string , remark : string}]

  //Frontend
  feature_type: z.array(z.string()).optional(),
  reference_figma: z.string().optional(),
  detail_task: z.string().optional(),
  design_validation_detail: z.string().optional(),
  styling_detail: z.string().optional(),
  api_integration: z.string().optional(),

  //Backend
  use_case: z.string().optional(),
  crud_type: z.string().optional(),
  detail: z.string().optional(),
  database_migration: z.string().optional(),
  controller_name: z.string().optional(),
  routes: z.string().optional(),
  related_view: z.string().optional(),

  //ui/ux
  customer_requirement: z.string().optional(),
  ui_type: z.array(z.string()).optional(),
  reference_platform: z.string().optional(),
  ui_detail_task: z.string().optional(),
  ui_styling_detail: z.string().optional(),
  total_ui_screen: z.number().optional(),
  confirmed_ui_screen: z.number().optional(),

  //testing
  testing_type: z.string().optional(),
  initial_test_brief: z.string().optional(),
  testing_issues: z.string().optional(),
  testing_overall: z.string().optional(),
  customer_comment: z.string().optional(), //if customer involves

  //deployment
  deployment_type: z.string().optional(),
  deployment_brief: z.string().optional(),
  server_type: z.string().optional(),
  instance_name: z.string().optional(),
  configuration: z.string().optional(),
  db_type: z.string().optional(),
  db_name: z.string().optional(),
  ip_and_port: z.string().optional(),
  username: z.string().optional(),
  project_type: z.array(z.string()).optional(),
  dev_type: z.array(z.string()).optional(),
  sub_domain: z.string().optional(),
  server_restart_after_deploy: z.boolean().optional(),
  apk_released_if_mobile: z.boolean().optional().default(false), //optional
  sent_to_customer_if_mobile: z.boolean().optional().default(false), //optional
  deployment_issues: z.string().optional(),
  deployment_overall: z.string().optional(),

  //content-management-form
  content_title: z.string().optional(),
  content_description: z.string().optional(),
  notify_date: z.date().optional(),
  notify_time: z.string().optional(),
  is_seen: z.boolean().optional(),
});

export type TTaskFormSchema = z.infer<typeof taskFormSchema>;
