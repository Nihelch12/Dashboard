<?php


namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\Administrator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Response;
use Mail;

class RegisterController extends BaseController

{

    /**
     * Register api
     *
     * @return \Illuminate\Http\Response
     */


    public function register(Request $request)

    {


        $validator = Validator::make($request->all(), [
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
            'c_password' => 'required|same:password',
            'role' => 'required',
            'status' => 'required'
        ]);


        if ($validator->fails()) {

            return $this->sendError('Validation Error.', $validator->errors());

        }

        $email = $request->email;
        $password = $request->password;

        $data = ['foo' => 'baz'];

        Mail::send($data, ['password' => $password], function ($message) use ($email, $password) {
            $message->from('testseemba@gmail.com', 'Seemba');

            $message->to($email)->subject($password);


        });
//        Mail::send([], [], function ($message) use ($email, $password) {
//            $message->sender('testseemba@gmail.com', 'Seemba')
//                ->to($email)
//                ->subject('hello')
//                ->setBody('Hi, welcome user!', $password);
//
//        });


        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $user = Administrator::create($input);
        $success['token'] = $user->createToken('MyApp')->accessToken;
        $success['first_name'] = $user->first_name;
        $success['role'] = $user->role;


        return $this->sendResponse($success, 'User register successfully.');

    }

    public function login(Request $request)
    {
        if (!Auth::guard('administrator')->attempt($request->only('email', 'password'))) {
            return response([
                'message' => 'Invalid credentials!'
            ], Response::HTTP_UNAUTHORIZED);
        }

        $user = Auth::guard('administrator')->user();

        $token = $user->createToken('token')->accessToken;

        $cookie = cookie('jwt', $token, 60 * 24); // 1 day

        return $this->sendResponse($cookie, [
            'token' => $token,
            'role' => $user->role,
            'user' => $user
        ])->withCookie($cookie);

    }

    public function user()
    {

        return Auth::guard('administrator')->user();

    }

    public function loginn(Request $request)
    {
        try {
            if (Auth::guard('administrator')->attempt(['email' => request('email'),
                'password' => request('password')])) {
                $user = Auth::guard('administrator')->user();
                $success['token'] = $user->createToken('MyApp')->accessToken;
                $success['name'] = $user->name;
                $success['role'] = $user->role;
                return $this->sendResponse($success, 'User login successfully.');

            } else {
                return $this->sendError("mot de passe ghalet");

            }
        } catch (\Exception $e) {

            return $e->getMessage();
        }

    }


}
