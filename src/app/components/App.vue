<template>
<div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#"></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
            <li class="nav-item active">
                <a class="nav-link" href="#">Materiales <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Programas</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Segmentos</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Soporte</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Parrilla</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Vistas</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Salir</a>
            </li>
            </ul>
        </div>
    </nav>

    <div class="container" style="margin-top: 20px">
        <div class="d-flex justify-content-end">
            <form class="form-inline">
                <select class="form-control mr-2" v-model="searching.option">
                    <option v-for="(option, index) of options" :key="index" :value="option.value">
                        {{option.name}}
                    </option>
                </select>
                <input class="form-control mr-sm-2" v-model="searching.text" type="search" placeholder="Buscar" aria-label="Search">
                <button class="btn btn-outline-success my-2 my-sm-0" type="button" @click="filterMaterial">Buscar</button>
            </form>
        </div>
        <div style="background-color: gray;" class="p-2 my-5">
            <h2 class="text-center">Lista de Materiales</h2>
        </div>
        <div class="d-flex justify-content-end">
            <button class="btn btn-success btn-sm" type="button" data-toggle="modal" data-target="#materialModal">
                <i class="fas fa-plus"></i> Nuevo Material
            </button>
        </div>
        <br>
        <div v-for="(material, index) of materials" :key="index" class="bg-white shadow rounded rounded-lg p-3 mb-5">
            <div class="form-row">
                <div class="col-md-5 align-middle text-center">
                    <h2>{{ material.title }}</h2>
                    <h4>{{ material.code }}</h4>
                </div>
                <div class="col-md-7">
                    <div class="my-3">
                        <div class="btn-toolbar d-flex justify-content-end" role="toolbar" aria-label="Toolbar with button groups">
                            <div class="btn-group mr-2" role="group" aria-label="First group" v-if="!material.lock">
                                <button type="button" class="btn btn-sm btn-primary" @click="updateMaterial(index)">
                                    <i class="fas fa-edit"></i>
                                </button>
                            </div>
                            <div class="btn-group mr-2" role="group" aria-label="Second group" v-if="!material.lock">
                                <button type="button" class="btn btn-sm btn-warning" @click="deleteMaterial(material._id)">
                                    <i class="fas fa-trash-alt"></i>
                                </button>
                            </div>
                            <div class="btn-group" role="group" aria-label="Third group" v-show="!material.lock">
                                <button type="button" class="btn btn-sm btn-success" @click="material.lock = !material.lock">
                                    <i class="fas fa-unlock"></i>
                                </button>
                            </div>
                            <div class="btn-group" role="group" aria-label="Third group" v-show="material.lock">
                                <button type="button" class="btn btn-sm btn-danger" @click="material.lock = !material.lock">
                                    <i class="fas fa-lock"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <table class="table table-borderless">
                        <tr class="table-secondary">
                            <td colspan="2">
                                Duración:
                            {{ material.duration }}</td>
                        </tr>
                        <tr class="table-secondary">
                            <td>Tipo Material
                                {{ material.material_type }}
                            </td>
                            <td>Tipo Contenido {{ material.content_type }}</td>
                        </tr>
                    </table>
                </div>
                <hr>
            </div>
        </div>
    </div>
    <hr>
    <div>

        <div class="modal fade" id="materialModal" tabindex="-1" aria-labelledby="materialModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="materialModalLabel">Crear Material</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="sendMaterial" method="POST">
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Insert Title" v-model="material.title">
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Insert Code" v-model="material.code">
                            </div>

                            <div class="d-flex form-group">
                                <div class="mr-auto">
                                    <button class="btn btn-secondary btn-sm" type="button" data-dismiss="modal">Cancelar</button>
                                </div>
                                <div class="ml-auto">
                                    <button class="btn btn-primary btn-sm" type="submit">Guardar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    
    export default {
        data() {
            return {
                materials: [],
                material: {
                    'title': '',
                    'code': '',
                    'lock': false,
                    'edit': false
                },
                searching: {
                    option: 0,
                    text: ''
                },
                options: [
                    {
                        value: 0,
                        name: '---'
                    },
                    {
                        value: 1,
                        name: 'codigo'
                    },
                    {
                        value: 2,
                        name: 'titulo'
                    }
                ]
            }
        },
        created() {
            this.getMaterials();
        },
        methods: {
            updateMaterial(ind){
                this.material = this.materials[ind]
                this.material.edit = true
                $("#materialModal").modal('show')
            },
            filterMaterial(){
                let searching = this.searching;
                axios.get('/api/materials/')
                .then(resp => {
                    this.materials = resp.data
                    if (searching.option === 1){
                        this.materials = this.materials.filter( el => el.code == searching.text )
                    }
                    if (searching.option === 2) {
                        this.materials = this.materials.filter( el => el.title == searching.text )
                    }
                })
            },
            cleanMaterial(){
                this.material = {
                    'title': '',
                    'code': '',
                    'lock': false
                }
                $("#materialModal").modal('hide')
            },
            sendMaterial() {
                const headers = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
                if (this.material.edit){
                    axios.put(`api/materials/${ this.material._id }`, this.material, headers)
                    .then( resp => {
                        this.cleanMaterial()
                        this.getMaterials()
                    })
                } else {
                    axios.post('api/materials/', this.material, headers)
                    .then( resp => {
                        this.cleanMaterial()
                        this.getMaterials()
                    })
                }
            },
            getMaterials(){
                axios.get('/api/materials/')
                .then(resp => {
                    this.materials = resp.data
                })
            },
            deleteMaterial(mId) {
                axios.delete(`/api/materials/${ mId }/`)
                .then(data => { 
                    this.getMaterials()
                    })
            },

        }
    }

</script>