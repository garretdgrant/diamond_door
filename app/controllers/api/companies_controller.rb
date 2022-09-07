class Api::CompaniesController < ApplicationController

    def index
        @companies = Company.all
        render :index
    end

    def show
        @company = Company.find_by(id: params[:id])
        if @company
            render :show
        else
            render json: {errors: 'Company not found'}, status: 404
        end
    end

end
