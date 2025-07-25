import { useUploadImageMutation } from '@/services/upload';
import Cherry from 'cherry-markdown/dist/cherry-markdown.core.js';
import 'cherry-markdown/dist/cherry-markdown.css';
import classNames from 'classnames';
import { FC, Ref, useEffect, useImperativeHandle, useRef } from 'react';
export interface MarkdownEditorRef {
	clear: () => void
}
interface Props {
	className?: string,
	value?: string,
	onChange: (value: string) => void;
	ref?: Ref<MarkdownEditorRef>
}
export const MarkdownEditor: FC<Props> = ({ ref, className, value = '', onChange }) => {
	const editorRef = useRef<Cherry | null>(null)
	const uploadImageMutation = useUploadImageMutation()
	useImperativeHandle(ref, () => {
		return {
			clear: () => {
				editorRef.current?.setValue('')
			}
		}
	})
	useEffect(() => {
		editorRef.current = new Cherry({
			id: 'markdown-container',
			value,
			event: {
				// 当编辑区内容有实际变化时触发
				afterChange: onChange,
			},
			editor: {
				id: 'code', // textarea 的id属性值
				name: 'code', // textarea 的name属性值
				autoSave2Textarea: false, // 是否自动将编辑区的内容回写到textarea里
				/**
				 * @deprecated 不再支持theme的配置，废弃该功能，统一由`themeSettings.mainTheme`配置
				 */
				// theme: 'default',
				// 编辑器的高度，默认100%，如果挂载点存在内联设置的height则以内联样式为主
				height: '100%',
				// defaultModel 编辑器初始化后的默认模式，一共有三种模式：1、双栏编辑预览模式；2、纯编辑模式；3、预览模式
				// edit&preview: 双栏编辑预览模式
				// editOnly: 纯编辑模式（没有预览，可通过toolbar切换成双栏或预览模式）
				// previewOnly: 预览模式（没有编辑框，toolbar只显示“返回编辑”按钮，可通过toolbar切换成编辑模式）
				defaultModel: 'edit&preview',
				// 粘贴时是否自动将html转成markdown
				convertWhenPaste: true,
				// 快捷键风格，目前仅支持 sublime 和 vim
				keyMap: 'sublime',
				codemirror: {
					// 是否自动focus 默认为true
					autofocus: false,
				},
				writingStyle: 'normal', // 书写风格，normal 普通 | typewriter 打字机 | focus 专注，默认normal
				keepDocumentScrollAfterInit: false, // 在初始化后是否保持网页的滚动，true：保持滚动；false：网页自动滚动到cherry初始化的位置
				showFullWidthMark: true, // 是否高亮全角符号 ·|￥|、|：|“|”|【|】|（|）|《|》
				showSuggestList: true, // 是否显示联想框
			},
			fileUpload(file, callback) {
				uploadImageMutation.mutate(file, {
					onSuccess: ({ url }) => {
						callback(url)
					}
				})
			},
		});
		return () => {
			editorRef.current?.destroy()
		}
	}, [value, onChange])
	return (
		<main className={classNames(className)}>
			<div id="markdown-container"></div>
		</main>
	)
}
