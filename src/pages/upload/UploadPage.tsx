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
            (file) => !uploadStates.some((state) => state.file === file)
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
        uploadStates.forEach((state) => {
            if (state.status === "pending") {
                uploadFile(state);
            }
        });
    }, [uploadStates]);

    const uploadFile = async (fileState: FileUploadState) => {
        const formData = new FormData();
        formData.append("files", fileState.file);
        const source = axios.CancelToken.source();

        // 업데이트: 각 상태(state)를 명확하게 표현합니다.
        setUploadStates((prev) =>
            prev.map((state) =>
                state.file === fileState.file
                    ? { ...state, status: "uploading", cancelToken: source }
                    : state
            )
        );

        try {
            const response = await axios.post(`${BaseUrl}/v1/invoice`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization:
                        "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMDI1IiwiaXNzIjoic2VvdWxtaWxrIiwidHlwZSI6ImFjY2VzcyIsImlhdCI6MTc0MTQwNTM2OSwiZXhwIjoxNzQxNDkxNzY5fQ.Ret4jmw5E_wwcQ_6eQfe6ZK5cBS4LBPKwPa5tze4niYUILBGHqhsJKo3ybYJXb0cJO81SNHrmdgNiNz_sK1e4Q",

                },
                onUploadProgress: (progressEvent) => {
                    const percent = Math.round(
                        (progressEvent.loaded * 100) /
                        (progressEvent.total || fileState.file.size)
                    );
                    setUploadStates((prev) =>
                        prev.map((state) =>
                            state.file === fileState.file ? { ...state, progress: percent } : state
                        )
                    );
                },
                cancelToken: source.token,
            });

            setUploadStates((prev) =>
                prev.map((state) =>
                    state.file === fileState.file
                        ? { ...state, status: response.status === 200 ? "success" : "error" }
                        : state
                )
            );
        } catch (error: unknown) {
            if (axios.isCancel(error)) {
                console.log("업로드가 취소되었습니다.");
            } else {
                console.log("업로드 중 에러 발생", error);
            }
            setUploadStates((prev) =>
                prev.map((state) =>
                    state.file === fileState.file ? { ...state, status: "error" } : state
                )
            );
        }
    };

    const handleCancel = (fileState: FileUploadState) => {
        fileState.cancelToken?.cancel("User canceled upload");
        setUploadStates((prev) =>
            prev.filter((state) => state.file !== fileState.file)
        );
    };

    const handleRetry = (fileState: FileUploadState) => {
        setUploadStates((prev) =>
            prev.map((state) =>
                state.file === fileState.file
                    ? { ...state, status: "pending", progress: 0 }
                    : state
            )
        );
    };

    const handleRemove = (fileState: FileUploadState) => {
        setUploadStates((prev) =>
            prev.filter((state) => state.file !== fileState.file)
        );
    };

    const isAllSuccess =
        uploadStates.length > 0 &&
        uploadStates.every((state) => state.status === "success");

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
