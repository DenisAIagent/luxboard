declare module 'qrcode.react' {
  import { ComponentType } from 'react';
  interface QRCodeProps {
    value: string;
    size?: number;
    bgColor?: string;
    fgColor?: string;
    level?: 'L' | 'M' | 'Q' | 'H';
    includeMargin?: boolean;
  }
  const QRCode: ComponentType<QRCodeProps>;
  export default QRCode;
}

declare module 'tailwind-merge' {
  export function twMerge(...classes: (string | undefined | null | boolean)[]): string;
  export function clsx(...classes: (string | undefined | null | boolean)[]): string;
}

declare module 'xlsx' {
  export interface WorkBook {
    SheetNames: string[];
    Sheets: { [key: string]: WorkSheet };
  }
  export interface WorkSheet {
    [key: string]: any;
  }
  export function read(data: any, opts?: any): WorkBook;
  export function write(workbook: WorkBook, opts?: any): any;
  export const utils: {
    sheet_to_json: (worksheet: WorkSheet, opts?: any) => any[];
    json_to_sheet: (data: any[], opts?: any) => WorkSheet;
  };
}

declare module 'jspdf' {
  export default class jsPDF {
    constructor(orientation?: string, unit?: string, format?: string);
    text(text: string, x: number, y: number): void;
    addPage(): void;
    save(filename: string): void;
    setFontSize(size: number): void;
  }
} 