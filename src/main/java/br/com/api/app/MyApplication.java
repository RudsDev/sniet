package br.com.api.app;

import java.util.HashSet;
import java.util.Set;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

import br.com.api.resource.EspecieResource;
import br.com.api.resource.IncidenteResource;
import br.com.api.resource.UsuarioResource;
import io.swagger.jaxrs.config.BeanConfig;
import io.swagger.jaxrs.listing.ApiListingResource;
import io.swagger.jaxrs.listing.SwaggerSerializers;

@ApplicationPath("/servlet")
public class MyApplication extends Application {
	
	public MyApplication() {
		BeanConfig config = new BeanConfig();
		
		config.setTitle("SNIET API - Usuarios");
		config.setDescription("Prototipo SNIET.");
		config.setVersion("1.2.1");
		config.setHost("http://191.252.101.19");
		config.setBasePath("/sniet/servlet");
		config.setSchemes(new String[]{"http"});
		config.setResourcePackage("br.com.api.resource");
		config.setScan(true);
		
	}
	
	
	@Override
	public Set<Class<?>> getClasses() {
		final Set<Class<?>> classes = new HashSet<Class<?>>();
		
		// register resources and features
		classes.add(EspecieResource.class);
		classes.add(IncidenteResource.class);
		classes.add(UsuarioResource.class);
		classes.add(CORSFilter.class);
		classes.add(ApiListingResource.class);
		classes.add(SwaggerSerializers.class);
		 
		return classes;
	}
}