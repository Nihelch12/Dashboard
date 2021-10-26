<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class isSuperadminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if( Auth::guard('administrator')->check() && Auth::guard('administrator')->user()->role == 'superadmin'){
            return $next($request);
        }else{
            return redirect()->route('loginn');
        }
    }
}
