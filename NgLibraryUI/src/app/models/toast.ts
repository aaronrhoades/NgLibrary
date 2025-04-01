export class Toast {
    header?: string | null = null;
    body: string = '';
    type?: ToastType = ToastType.info;
    duration?: number = 3000;

    constructor(toast: Toast){
        this.header = toast.header || null;
        this.body = toast.body;
        this.type = toast.type || ToastType.info;
        this.duration = toast.duration || 3000;
    }
}
export enum ToastType {
    success = 'success',
    error = 'error',
    info = 'info',
    warning = 'warning',   
}