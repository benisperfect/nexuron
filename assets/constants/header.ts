export const HEADER_TEAM: Array<
  Record<
    "id" | "title" | "url" | "description" | "function" | "position",
    string
  >
> = [
  {
    id: crypto.randomUUID(),
    title: "Ban Quét sân",
    url: "quet_san",
    description: "Đội ngũ quét sân trường",
    function: "Khối lao động công ích",
    position: "Thành viên",
  },
  {
    id: crypto.randomUUID(),
    title: "Ban Vệ sinh",
    url: "ve_sinh",
    description: "Đội ngũ vệ sinh lớp học",
    function: "Khối lao động công ích",
    position: "Thành viên",
  },
  {
    id: crypto.randomUUID(),
    title: "Ban Thực phẩm",
    url: "thuc_pham",
    description: "Đội ngũ thực phẩm",
    function: "Khối lao động công ích",
    position: "Thành viên",
  },
  {
    id: crypto.randomUUID(),
    title: "Ban Không khí",
    url: "khong_khi",
    description: "Đội ngũ không khí",
    function: "Khối lao động công ích",
    position: "Thành viên",
  },
];

export const NAVIGATION_MENU: Array<{
  id: string;
  title: string;
  url: string;
}> = [
  {
    id: crypto.randomUUID(),
    title: "Trang chủ",
    url: "/",
  },
  {
    id: crypto.randomUUID(),
    title: "Tuyển thành viên",
    url: "/job-openings",
  },
];
