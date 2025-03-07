import { useState, useEffect } from "react";
import axios, { CancelTokenSource } from "axios";
import Uploader from "@components/upload/Uploader";
import UploadModal from "@components/upload/UploadModal";

export interface FileUploadState {
    file: File;
    progress: number;
    status: "pending" | "uploading" | "success" | "error";
    cancelToken?: CancelTokenSource;
}

const UploadPage = () => {
    const BaseUrl = import.meta.env.VITE_BACKEND_URL;
    const [files, setFiles] = useState<File[]>([]);
    const [uploadStates, setUploadStates] = useState<FileUploadState[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const closeModal = () => setIsModalOpen(false);

    const handleFilesAdded = (newFiles: File[]) => {
        setFiles((prev) => [...prev, ...newFiles]);
        setIsModalOpen(true);
    };

    useEffect(() => {
        const newFiles = files.filter(
            (file) => !uploadStates.some((u) => u.file === file)
        );
        if (newFiles.length > 0) {
            const newUploadStates = newFiles.map((file) => ({
                file,
                progress: 0,
                status: "pending" as const,
            }));
            setUploadStates((prev) => [...prev, ...newUploadStates]);
        }
    }, [files, uploadStates]);

    useEffect(() => {
        uploadStates.forEach((fs) => {
            if (fs.status === "pending") {
                uploadFile(fs);
            }
        });

    }, [uploadStates]);

    const uploadFile = async (fileState: FileUploadState) => {
        const formData = new FormData();
        formData.append("file", fileState.file);
        const source = axios.CancelToken.source();


        setUploadStates((prev) =>
            prev.map((fs) =>
                fs.file === fileState.file
                    ? { ...fs, status: "uploading", cancelToken: source }
                    : fs
            )
        );

        try {
            const response = await axios.post(`${BaseUrl}/v1/invoice`, formData, {
                onUploadProgress: (progressEvent) => {
                    const percent = Math.round(
                        (progressEvent.loaded * 100) /
                        (progressEvent.total || fileState.file.size)
                    );
                    setUploadStates((prev) =>
                        prev.map((fs) =>
                            fs.file === fileState.file ? { ...fs, progress: percent } : fs
                        )
                    );
                },
                cancelToken: source.token,
            });

            setUploadStates((prev) =>
                prev.map((fs) =>
                    fs.file === fileState.file
                        ? { ...fs, status: response.status === 200 ? "success" : "error" }
                        : fs
                )
            );
        } catch (error: unknown) {
            if (axios.isCancel(error)) {
                console.log("업로드가 취소되었습니다.");
            } else {
                console.log("업로드 중 에러 발생", error);
            }
            setUploadStates((prev) =>
                prev.map((fs) =>
                    fs.file === fileState.file ? { ...fs, status: "error" } : fs
                )
            );
        }
    };

    const handleCancel = (fileState: FileUploadState) => {
        fileState.cancelToken?.cancel("User canceled upload");
        setUploadStates((prev) => prev.filter((fs) => fs.file !== fileState.file));
    };

    const handleRetry = (fileState: FileUploadState) => {
        setUploadStates((prev) =>
            prev.map((fs) =>
                fs.file === fileState.file ? { ...fs, status: "pending", progress: 0 } : fs
            )
        );
    };

    const handleRemove = (fileState: FileUploadState) => {
        setUploadStates((prev) => prev.filter((fs) => fs.file !== fileState.file));
    };

    const isAllSuccess =
        uploadStates.length > 0 &&
        uploadStates.every((fs) => fs.status === "success");

    return (
        <>
            <Uploader onFilesAdded={handleFilesAdded} />

            {isModalOpen && (
                <UploadModal
                    uploadStates={uploadStates}
                    onCancel={handleCancel}
                    onRetry={handleRetry}
                    onRemove={handleRemove}
                    onComplete={() => {
                        if (isAllSuccess) {
                            closeModal();
                        }
                    }}
                    onClose={closeModal}
                />
            )}
        </>
    );
};

export default UploadPage;
