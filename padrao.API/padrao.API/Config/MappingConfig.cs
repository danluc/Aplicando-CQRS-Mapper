using AutoMapper;
using padrao.API.Models;
using padrao.API.Models.DTOs.Clientes;
using padrao.API.Models.DTOs.Hotel;
using padrao.API.Models.DTOs.Motoristas;
using padrao.API.Models.DTOs.Onibus;
using padrao.API.Models.DTOs.Usuarios;
using System;

namespace padrao.API.Config
{
    public class AutoMapperSetup : Profile
    {
        public AutoMapperSetup()
        {
            CreateMap<Usuarios, UsuarioDTO>()
                .ReverseMap();
            CreateMap<UsuarioDTO, Usuarios>()
                .ForMember(e => e.DataCadastro, op => op.Ignore())
                .ReverseMap();
            CreateMap<Clientes, ClienteDTO>()
                .ReverseMap();
            CreateMap<ClienteDTO, Clientes>()
                .ForMember(e => e.DataCadastro, op => op.Ignore())
                .ReverseMap();
            CreateMap<Motoristas, MotoristaDTO>()
               .ReverseMap();
            CreateMap<MotoristaDTO, Motoristas>()
                .ForMember(e => e.DataCadastro, op => op.Ignore())
                .ReverseMap();
            CreateMap<Onibus, OnibusDTO>()
               .ReverseMap();
            CreateMap<OnibusDTO, Onibus>()
                .ForMember(e => e.DataCadastro, op => op.Ignore())
                .ReverseMap();
            CreateMap<Hotel, HotelDTO>()
               .ReverseMap();
            CreateMap<HotelDTO, Hotel>()
                .ReverseMap();
        }
    }
}
