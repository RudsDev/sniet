package br.com.api.init;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

import br.com.api.dao.BarbatanaDao;
import br.com.api.dao.DenticaoDao;
import br.com.api.dao.DorsoDao;
import br.com.api.dao.FocinhoDao;
import br.com.api.dao.HabitatDao;
import br.com.api.dao.ReproducaoDao;
import br.com.api.dao.VentreDao;
import br.com.api.model.Barbatana;
import br.com.api.model.Denticao;
import br.com.api.model.Dorso;
import br.com.api.model.Focinho;
import br.com.api.model.Habitat;
import br.com.api.model.Reproducao;
import br.com.api.model.Ventre;
import br.com.api.service.GenericService;
import br.com.api.service.Service;
import br.com.api.util.GenerateClass;

@WebListener
public class LoadDataServlet implements ServletContextListener {

	public void contextInitialized(ServletContextEvent event){
		
		System.out.println("INICIOU!");
		
		GenericService service = GenerateClass.generateServiceClass(Service.class);
		
		service.setClassType(Focinho.class);
		service.setDao(new FocinhoDao());
		System.out.println(service.getAll());
		
		service.setClassType(Habitat.class);
		service.setDao(new HabitatDao());
		System.out.println(service.getAll());
		
		service.setClassType(Ventre.class);
		service.setDao(new VentreDao());
		System.out.println(service.getAll());
		
		service.setClassType(Dorso.class);
		service.setDao(new DorsoDao());
		System.out.println(service.getAll());
		
		service.setClassType(Denticao.class);
		service.setDao(new DenticaoDao());
		System.out.println(service.getAll());
		
		service.setClassType(Barbatana.class);
		service.setDao(new BarbatanaDao());
		System.out.println(service.getAll());
		
		service.setClassType(Reproducao.class);
		service.setDao(new ReproducaoDao());
		System.out.println(service.getAll());
			
	}

	@Override
	public void contextDestroyed(ServletContextEvent arg0) {

	}

}
