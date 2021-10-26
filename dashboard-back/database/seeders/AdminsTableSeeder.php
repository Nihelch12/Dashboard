<?php

namespace Database\Seeders;

use App\Models\Administrator;
use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;


class AdminsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Administrator::truncate();
        DB::collection('roles')->truncate();

        $adminRole = Role::where('name','admin')->first();
        $SuperadminRole = Role::where('name','Superadmin')->first();


        $admin= Administrator::create([
            'name'=> 'Admin user',
            'email'=> 'nihel.chraief@esprit.tn',
            'password'=>Hash::make('adminadmin')
        ]);

        $Superadmin= Administrator::create([
            'name'=> 'Super admin',
            'email'=> 'nihelch122@gmail.tn',
            'password'=>Hash::make('adminadmin')
        ]);

        $admin->roles()->attach($adminRole);
        $Superadmin->roles()->attach($SuperadminRole);

    }
}
