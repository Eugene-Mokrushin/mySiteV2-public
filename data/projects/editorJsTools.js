// export default {
    // header: {
    //     class: Header,
    //     config: {
    //         placeholder: 'Enter a header',
    //         levels: [1, 2, 3, 4],
    //         defaultLevel: 3
    //     }
    // },
    // image: {
    //     class: ImageTool,
    //     config: {
    //         uploader: {
    //             async uploadByFile(file) {
    //                 let result
    //                 const { url } = await fetch(`http://127.0.0.1:8080/s3UrlProjectPhotos/${file.name}`).then(res => res.json())
    //                 await fetch(url, {
    //                     method: "PUT",
    //                     headers: {
    //                         "Content-Type": "multipart/form-data"
    //                     },
    //                     body: file
    //                 }).then(res => { result = res })
    //                 if (result.status === 200) {
    //                     return {
    //                         "success": 1,
    //                         "file": {
    //                             'url': url.split('?')[0]
    //                         }
    //                     }
    //                 } else {
    //                     return {
    //                         "success": 0
    //                     }
    //                 }
    //             },
    //         }
    //     }
    // },
    // table: {
    //     class: Table,
    //     inlineToolbar: true,
    //     config: {
    //         rows: 2,
    //         cols: 3,
    //     },
    // },
    // list: {
    //     class: NestedList,
    //     inlineToolbar: true,
    //     tunes: ['footnotes']
    // },
    // embed: {
    //     class: Embed,
    //     config: {
    //         services: {
    //             youtube: true,
    //             coub: true,
    //             codepen: {
    //                 regex: /https?:\/\/codepen.io\/([^\/\?\&]*)\/pen\/([^\/\?\&]*)/,
    //                 embedUrl: 'https://codepen.io/<%= remote_id %>?height=300&theme-id=0&default-tab=css,result&embed-version=2',
    //                 html: "<iframe height='300' scrolling='no' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'></iframe>",
    //                 height: 300,
    //                 width: 600,
    //                 id: (groups) => groups.join('/embed/')
    //             }
    //         }
    //     }
    // },
    // paragraph: {
    //     class: Paragraph,
    //     inlineToolbar: true,
    //     tunes: ['footnotes']
    // },
    // underline: Underline,
    // raw: RawTool,
    // code: CodeTool,
    // delimiter: Delimiter,
    // inlineCode: {
    //     class: InlineCode,
    //     shortcut: 'CMD+SHIFT+C',
    // },
    // Marker: {
    //     class: Marker,
    //     shortcut: 'CMD+SHIFT+M',
    // },
    // footnotes: {
    //     class: FootnotesTune,
    // }
// }