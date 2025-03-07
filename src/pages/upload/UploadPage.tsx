import { useState } from "react";
import Uploader from "@components/upload/Uploader";
import UploadModal from "@components/upload/UploadModal";

const UploadPage = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const closeModal = () => setIsModalOpen(false);

    const handleFilesAdded = (newFiles: File[]) => {
        setFiles((prev) => [...prev, ...newFiles]);
        setIsModalOpen(true); // ✅ 파일 추가 후 모달 열기
    };

    return (
        <>
            <Uploader onFilesAdded={handleFilesAdded} />

            {isModalOpen && (
                <UploadModal
                    files={files}
                    onFilesAdded={handleFilesAdded} // ✅ 모달에서도 추가 가능하도록
                    onClose={closeModal}
                />
            )}
        </>
    );
};

export default UploadPage;
