<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class ResetPasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset requests
    | and uses a simple trait to include this behavior. You're free to
    | explore this trait and override any methods you wish to tweak.
    |
    */


    use ResetsPasswords;

//    public function reset(Request $request)
//    {
//        $request->validate($this->rules(), $this->validationErrorMessages());
//
//        // Here we will attempt to reset the user's password. If it is successful we
//        // will update the password on an actual user model and persist it to the
//        // database. Otherwise we will parse the error and return the response.
//        $response = $this->broker()->reset(
//            $this->credentials($request), function ($user, $password) {
//            $this->resetPassword($user, $password);
//        }
//        );
//
//        // If the password was successfully reset, we will redirect the user back to
//        // the application's home authenticated view. If there is an error we can
//        // redirect them back to where they came from with their error message.
//        return $response == Password::PASSWORD_RESET
//            ? $this->sendResetResponse($request, $response)
//            : $this->sendResetFailedResponse($request, $response);
//    }




    protected function guard()
    {
        return Auth::guard('administrator');
    }

    public function broker()
    {
        return Password::broker('administrators');
    }

    protected function resetPassword($user, $password)
    {
        $user->forceFill([
            'password' => $password,
            'remember_token' => str_random(60),
        ])->save();

        $this->guard()->login($user);
    }


    protected function sendResetResponse(Request $request, $response)
    {   return response (['message'=> trans($response)]);
    }

    protected function sendResetFailedResponse(Request $request, $response)
    {
        return response (['error'=> trans($response)], 422);

    }


}
