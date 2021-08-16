import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxOtpInputConfig } from "ngx-otp-input";
import { Toast, UserService } from "src/app/core";

@Component({
    selector: 'app-otp',
    templateUrl: 'otp.component.html'
})
export class OtpComponent {

    otpInputConfig: NgxOtpInputConfig = {
        otpLength: 6,
        autofocus: true,
        classList: {
            inputBox: "form-group",
            input: "form-control",
            inputFilled: "text-warning",
            inputDisabled: "text-success",
            inputSuccess: "text-success",
            inputError: "text-danger"
          }
      };

    email = '';
    type = 1;
    isResendDisable = false;
    constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {
        this.route.params.subscribe(params => {
            this.email = params['email'];
            this.type = +params['type'];
        })
    }
    ngOnInit(): void {
    }
    onOtpChange(e: any) {

            this.userService.verifyOtp(e, this.email).subscribe
                (
                    res => {
                        if (res.status === 200) {
                            if(this.type === 1) {
                                this.router.navigate(['/initial-community']);
                            } else {
                                this.router.navigate(['/auth/reset'],{queryParams:{email:this.email , otp:e} });
                            }
                            Toast.fire({ text: 'OTP Verified Successfully', icon: 'success' })

                        } else {
                            Toast.fire({ text: 'OTP is Invalid', icon: 'error' })

                        }
                    },
                    err => {
                        Toast.fire({ text: 'OTP is Invalid', icon: 'error' })

                    }
                )

    }
    onResendEmail() {
        this.isResendDisable = true;
        this.userService.resendOtp(this.email).subscribe(res => {
            if (res.status === 200) {
                Toast.fire({ text: 'OTP sent to your Email', icon: 'success' })
            }
            this.isResendDisable = false;
        })
    }
}
