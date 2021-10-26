<?php

namespace App\Models;

use App\Notifications\ResetPasswordNotification;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\Access\Authorizable;
use Illuminate\Notifications\Notifiable;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;
use Illuminate\Auth\Authenticatable as AuthenticableTrait;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Passport\HasApiTokens;

class Administrator extends Eloquent implements

    AuthenticatableContract,
    \Illuminate\Contracts\Auth\Access\Authorizable,
    CanResetPasswordContract
 //   Illuminate\Foundation\Auth\User\Authenticatable
{
    use Authorizable;
    use AuthenticableTrait;
    use Notifiable;
    use CanResetPassword;
    use HasApiTokens;



    protected $connection = 'mongodb';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guard = 'administrator';

    protected $fillable = [

        'first_name',

        'last_name',

        'email',

        'password',

        'role',

        'status'

    ];



    /**

     * The attributes that should be hidden for arrays.

     *

     * @var array

     */

    protected $hidden = [

        'password',

        'remember_token',

    ];



    public function sendPasswordResetNotification($token)
    {
        $url = 'https://example.com/reset-password?token='.$token;

        $this->notify(new ResetPasswordNotification($url));
    }



    /**

     * The attributes that should be cast to native types.

     *

     * @var array

     */

    protected $casts = [

        'created_at' => 'datetime',

    ];

}
