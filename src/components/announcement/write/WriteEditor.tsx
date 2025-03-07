import { useState, useEffect, useRef, useMemo } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
    ClassicEditor,
    AutoLink,
    Autosave,
    BlockToolbar,
    Bold,
    Essentials,
    Italic,
    Link,
    PageBreak,
    Paragraph,
    Table,
    TableCaption,
    TableCellProperties,
    TableColumnResize,
    TableProperties,
    TableToolbar,
    Image,
    ImageToolbar,
    ImageCaption,
    ImageStyle,
    Base64UploadAdapter,
    ImageUpload,
    ImageResize
} from 'ckeditor5';

import translations from 'ckeditor5/translations/ko.js';
import 'ckeditor5/ckeditor5.css';
import './WriteEditor.css';

const LICENSE_KEY = 'GPL';

const WriteEditor = () => {
    const editorContainerRef = useRef<HTMLDivElement>(null);
    const editorRef = useRef<HTMLDivElement>(null);
    const [isLayoutReady, setIsLayoutReady] = useState(false);

    useEffect(() => {
        setIsLayoutReady(true);
        return () => setIsLayoutReady(false);
    }, []);

    const { editorConfig } = useMemo(() => {
        if (!isLayoutReady) {
            return {};
        }

        return {
            editorConfig: {
                toolbar: {
                    items: [
                        'bold',
                        'italic',
                        'imageUpload', // 이미지 업로드 버튼
                        '|',
                        'pageBreak',
                        'link',
                        'insertTable'
                    ],
                    shouldNotGroupWhenFull: false
                },
                plugins: [
                    AutoLink,
                    Autosave,
                    BlockToolbar,
                    Bold,
                    Essentials,
                    Italic,
                    Link,
                    PageBreak,
                    Paragraph,
                    Table,
                    TableCaption,
                    TableCellProperties,
                    TableColumnResize,
                    TableProperties,
                    TableToolbar,
                    // 이미지 관련 플러그인
                    Image,
                    ImageToolbar,
                    ImageCaption,
                    ImageStyle,
                    ImageUpload,
                    Base64UploadAdapter,
                    // 이미지 리사이즈 플러그인
                    ImageResize
                ],
                blockToolbar: ['bold', 'italic', '|', 'link', 'insertTable'],
                initialData: `<p></p>`,
                language: 'ko',
                licenseKey: LICENSE_KEY,
                link: {
                    addTargetToExternalLinks: true,
                    defaultProtocol: 'https://',
                    decorators: {
                        toggleDownloadable: {
                            mode: 'manual' as const,
                            label: 'Downloadable',
                            attributes: {
                                download: 'file'
                            }
                        }
                    }
                },
                placeholder: '내용을 입력해주세요.',
                table: {
                    contentToolbar: [
                        'tableColumn',
                        'tableRow',
                        'mergeTableCells',
                        'tableProperties',
                        'tableCellProperties'
                    ]
                },
                translations: [translations],

                // 이미지 리사이즈 관련 설정
                image: {
                    resizeUnit: '%' as const,
                    resizeOptions: [
                        {
                            name: 'imageResize:original',
                            value: null,
                            label: 'Original'
                        },
                        {
                            name: 'imageResize:25',
                            value: '25',
                            label: '25%'
                        },
                        {
                            name: 'imageResize:50',
                            value: '50',
                            label: '50%'
                        },
                        {
                            name: 'imageResize:75',
                            value: '75',
                            label: '75%'
                        },
                        {
                            name: 'imageResize:100',
                            value: '100',
                            label: '100%'
                        }
                    ],
                    toolbar: [
                        'imageResize',
                        '|',
                        'imageStyle:alignLeft',
                        'imageStyle:alignCenter',
                        'imageStyle:alignRight',
                        '|',
                        'imageTextAlternative'
                    ]
                }
            }
        };
    }, [isLayoutReady]);

    return (
        <div className="main-container">
            <div
                className="editor-container editor-container_classic-editor editor-container_include-block-toolbar"
                ref={editorContainerRef}
            >
                <div className="editor-container__editor">
                    <div ref={editorRef}>
                        {editorConfig && (
                            <CKEditor editor={ClassicEditor} config={editorConfig} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WriteEditor;
