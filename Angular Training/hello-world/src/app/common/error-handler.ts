import { ErrorHandler } from '@angular/core';

export class AppErrorHandler extends ErrorHandler {
    handleError(error) {
        alert(error.message || 'Unexpected error.');
        console.log(error);
    }
}