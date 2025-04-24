declare module 'quill' {
  interface QuillOptions {
    theme?: string;
    placeholder?: string;
    modules?: {
      toolbar?: any[];
    };
    [key: string]: any;
  }

  class Quill {
    root: {
      innerHTML: string;
    };
    constructor(container: HTMLElement, options: QuillOptions);
    on(event: string, callback: Function): void;
  }

  export default Quill;
} 