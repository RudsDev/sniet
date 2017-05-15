package br.com.util.api;

import java.io.IOException;
import com.google.maps.GeoApiContext;
import com.google.maps.GeocodingApi;
import com.google.maps.GeocodingApiRequest;
import com.google.maps.errors.ApiException;
import com.google.maps.model.GeocodingResult;
import com.google.maps.model.LatLng;
import br.com.model.api.Incidente;

public class Maps {

	private GeoApiContext context = new GeoApiContext().setApiKey("AIzaSyBL3U0sz0c75omwtSikefpx2AIXLqoQLuk");
	private Incidente incidente = new Incidente();
	private LatLng location;
	private GeocodingApiRequest reverso;

	public void teste(){

		incidente.setLatitude(-22.792438);
		incidente.setLongitude(-43.169765);
		location = new LatLng(incidente.getLatitude(), incidente.getLongitude());
		reverso = GeocodingApi.reverseGeocode(context, location);

		try {
			GeocodingResult[] T = reverso.await();
			//Aqui terá na saída o endereço mais próximo em riqueza de detalhes 
			System.out.println("\nEndereço Formatado: "+T[0].formattedAddress);
			System.out.println("\nPlace ID: "+T[0].placeId);
			
			//Aqui terá na saída todos os endereços que foi recebido.
			for (int i=1; i<T.length;i++){
				System.out.println("\nEndereço Formatado: "+T[i].formattedAddress);
				System.out.println("\nPlace ID: "+T[i].placeId);
			}
			//Existem outros atributos dentro do objeto.

		} catch (ApiException | InterruptedException | IOException e) {
			// TODO Auto-generated catch block
		//	e.printStackTrace();
			System.out.println("Deu erro!");
		}
	}	
}