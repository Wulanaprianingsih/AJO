import React from "react";
import { ICourse } from "types/course";

interface IProps {
  course: ICourse | null;
  handleNavigate: () => void;
}
export default function DetailMateriComponent({
  course,
  handleNavigate,
}: IProps) {
  return (
    <div>
      {course ? (
        <div>
          <p>{course?.title}</p>
          <div className="mt-10 px-10 space-y-4">{course?.content_text}</div>
          <button onClick={handleNavigate}>Selesai</button>
        </div>
      ) : (
        <div>Data tidak ditemukan, coba kembali ke halaman materi</div>
      )}
    </div>
  );
}
