<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;

class ForgotPasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset emails and
    | includes a trait which assists in sending these notifications from
    | your application to your users. Feel free to explore this trait.
    |
    */

    use SendsPasswordResetEmails;

    public function broker()
    {
        return Password::broker('administrators');
    }

    protected function sendResetLinkResponse(Request $request, $response)
    {
        return response (['message'=> trans($response)]);

    }


    protected function sendResetLinkFailedResponse(Request $request, $response)
    {
        return response (['error'=> trans($response)], 422);

    }
//    protected function sendResetLinkResponse(Request $request, $response)
//    {
//         Password::broker('administrators')->sendResetLink($request->only('email'));
//    }
}
