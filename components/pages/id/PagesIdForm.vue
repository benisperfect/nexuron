<script lang="ts" setup></script>

<template>
  <div class="border flex-1 flex flex-col p-6 rounded-xs gap-6">
    <div class="text-3xl font-semibold mt-2">Nộp đơn ứng tuyển</div>
    <div class="text-muted-foreground">
      Nếu bạn thấy Mô tả công việc phù hợp với bạn, hãy điền đơn ứng tuyển ngay
      nhé!
    </div>
    <div class="space-y-2">
      <div>Họ và Tên</div>
      <Input type="text" placeholder="Ví dụ: Trịnh Văn A" />
    </div>
    <div class="space-y-2">
      <div>Email</div>
      <Input type="email" placeholder="Ví dụ: studentViDu@ptnk.edu.vn" />
    </div>
    <div class="space-y-2">
      <div>Số điện thoại</div>
      <Input type="text" placeholder="Ví dụ: 0123456789" />
    </div>
    <div class="space-y-2">
      <div>Trường-Lớp</div>
      <Input type="text" placeholder="Ví dụ: Phổ thông Năng khiếu - 10 VD" />
    </div>
    <div class="space-y-2">
      <div>Bạn có dự định gì trong 12 tháng tới?</div>
      <Textarea type="text" placeholder=" " />
    </div>
    <div class="space-y-2">
      <div>
        Hãy miêu tả tính cách của bạn bằng 3 tính từ. Bạn nghĩ người khác có thể
        đánh giá bạn là người như thế nào?
      </div>
      <Textarea type="text" placeholder=" " />
    </div>
    <div class="space-y-2">
      <div>Phần trả lời dành cho câu hỏi chuyên môn.</div>
      <Textarea type="text" placeholder=" " />
    </div>
    <div class="space-y-2">
      <div>
        Đính kèm portfolio (Dành cho Tiểu ban Thiết kế, Tiểu ban Quản lý Nội
        dung và Tiểu ban Hình ảnh)
      </div>
      <Textarea type="text" placeholder=" " />
    </div>
    <div class="space-y-2">
      <div>Tải lên CV/Resume</div>
      <Input type="file" placeholder=" " />
      <div class="text-sm">Định dạng hỗ trợ: .pdf, .doc, .docx</div>
    </div>
    <Button type="submit"> Nộp đơn ứng tuyển </Button>
  </div>
</template>

<style></style>
