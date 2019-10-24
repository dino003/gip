<?php

namespace App\Http\Middleware;

use Closure;
use Hyn\Tenancy\Models\Hostname;


class TenantExists
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if ( $request->user() == null ) {
            $fqdn = $request->getHost();
            if ( ! $this->tenantExists( $fqdn ) ) {
                abort(403,'Le lien que vous avez suivi est introuvable !');
            }
        }
        
        return $next($request);
    }

    private function tenantExists( $fqdn ) {
        return Hostname::where( 'fqdn', $fqdn )->exists();
    }
}
