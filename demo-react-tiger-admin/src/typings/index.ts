import { AxiosResponse } from 'axios';

// 我的时间表
export interface ITimeTableItem {
  id?: string
  half?: number
  step?: number
  lessonstart?: string
  lessonend?: string
  semester_id?: string
}

// 我的学期表
export interface ISemesterBase {
  id?: string
  label?: string
  start?: string
  end?: string
  year?: number
  year_step?: number
  school_code?: string
  timetable: ITimeTableItem[]
}

export type ISemesterList = ISemesterBase[]

// 学生列表参数
export interface StudentListParams {
  current?: number
  size?: number
  name?: string
  grade_code?: string
  class_id?: string
  sex?: string
  exam_uuid: string
}

// 课程选项
export interface SubjectOptions {
  [key: number]: string
}

// 考场细节
export interface IExamPlacesDetail {
  exdate: any
  start_time: string
  morning_end: string
  afternoon_start: string
  subject: string
  room_code: string
  seat_num: number
  matches: number
  matches_uuid: string
}

// 考试地点
export interface Iplaces {
  area_code?: string
  exam_place_detail: IExamPlacesDetail[],
  exam_uuid?: string
  [prop: string]: any
}

// 考试学生
export interface IExamStudent {
  [prop: string]: number
}

// 考试信息
export interface IExamInfo {
  exam_student: IExamStudent
  exam_paper: IExamStudent
  exam_seat: IExamStudent
  exam_place_detail: IExamStudent
  max_seat?: number
}

export interface CustomAxiosResponse extends AxiosResponse {
  count?: string
}
